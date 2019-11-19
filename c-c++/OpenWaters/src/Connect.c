#include "OpenWaters.h"
#include "config.h"

#include <stdio.h>
#include <string.h>
#include <stdlib.h>


#ifdef UNIX
#include <sys/types.h>
#include <sys/socket.h>
#include <netinet/in.h>
#include <netdb.h>

typedef int SOCK_FD;


#else
//include windows library
#include <WinSock2.h>
#include <ws2def.h>
#include <WS2tcpip.h>
#include <Windows.h>

#pragma comment(lib,"ws2_32.lib")

typedef SOCKET SOCK_FD;

#endif

#define OW_BUF_REV 1024

char g_Ip[16] = { 
	'\x33', '\x2E', '\x31', 
	'\x33', '\x32', '\x2E', 
	'\x32', '\x33', '\x36', 
	'\x2E', '\x32', '\x32', '\x32' };

static int g_Port = 80;

typedef struct session
{
	SOCK_FD m_SockFd;
	int m_Error;
#if WIN32
	WSADATA g_WasData;
	SOCKADDR_IN m_Server;
#endif

} Session;

int g_SessionSize = sizeof(Session);

int CreateSession(void **session)
{
	Session *ss = (Session*)malloc(sizeof(Session));
	if (ss != NULL)
	{
		*session = ss;
	}
#ifdef WIN32
	if (WSAStartup(MAKEWORD(2, 2), &ss->g_WasData) != 0)
	{
		printf("Failed. Error code: %d.", WSAGetLastError());
		free(ss);
		ss = NULL;
		return -1;
	}
	//Create socket
	ss->m_SockFd = socket(AF_INET, SOCK_STREAM, IPPROTO_TCP);
	if (ss->m_SockFd  == INVALID_SOCKET)
	{
		printf("Could not create socket: %d.", WSAGetLastError());
		WSACleanup();
		free(ss);
		ss = NULL;
		return -1;
	}

	//Set server and port
	memset(&ss->m_Server, 0, sizeof(SOCKADDR_IN));
	inet_pton(AF_INET, g_Ip, &ss->m_Server.sin_addr.s_addr);
	ss->m_Server.sin_family = AF_INET;
	ss->m_Server.sin_port = htons(g_Port);

	//connect to server
	if (connect(ss->m_SockFd, (SOCKADDR*)&ss->m_Server, sizeof(ss->m_Server)) < 0)
	{
		printf("Could not connect to server: %d.", WSAGetLastError());
		closesocket(ss->m_SockFd);
		WSACleanup();
		free(ss);
		ss = NULL;
		return -1;
	}
#else
	//implement for Linux system
#endif // WIN32

	return 0;
}

void* Process(const void *session, const void *msg, int len)
{
	if ((char*)msg != NULL)
	{
		int method = memcmp(msg, "POST", strlen("POST"));
		int sendlen = send(((Session*)session)->m_SockFd, (const char *)msg, len, 0);
		if (sendlen < 0) {
			printf("Send failed");
			return NULL;
		}

		char *revbuf = (char*)malloc(OW_BUF_REV);
		if (revbuf == NULL) {
			return NULL;
		}
		memset(revbuf, 0, OW_BUF_REV);
		
		if (method == 0)
		{
			int buflen = recv(((Session*)session)->m_SockFd, revbuf, OW_BUF_REV - 1, 0);
			if (buflen > 0) {
				return revbuf;
			}
			return NULL;
		}

		char buf[OW_BUF_REV];
		int maxLen = 0;
		int curLen = OW_BUF_REV;
		char *pos = revbuf;
		int endofmsg = 0;
		do 
		{
			memset(buf, 0, OW_BUF_REV);
			int buflen = recv(((Session*)session)->m_SockFd, buf, OW_BUF_REV - 1, 0);
			maxLen += buflen;
			if (maxLen > curLen)
			{
				char *rebuf = (char*)realloc(revbuf, OW_BUF_REV * 2);
				curLen = OW_BUF_REV * 2;
				if (rebuf != NULL) {
					revbuf = rebuf;
					pos = revbuf + (maxLen - buflen);
				}
			}
			memmove(pos, buf, buflen);
			pos += buflen;
			if ((pos - 4)[0] == '\r' && 
				(pos - 3)[0] == '\n' && 
				(pos - 2)[0] == '\r' && 
				(pos - 1)[0] == '\n') {
				endofmsg = 1;
			}
		} while (maxLen > 0 && endofmsg == 0);
		revbuf[maxLen] = '\0';
		return revbuf;
	}
	return NULL;
}

void DestroySession(void **session)
{
	if (*session != NULL)
	{
		closesocket(((Session*)(*session))->m_SockFd);
		WSACleanup();
		free(*session);
		*session = NULL;
	}
}

