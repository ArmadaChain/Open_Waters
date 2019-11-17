// Armada.cpp : Defines the exported functions for the DLL application.
//

#include "config.h"
#include "OpenWaters.h"

#include <stdio.h>
#include <string.h>
#include <stdlib.h>


static char *g_Key = NULL;
static int g_KeyLen = 0;


extern char g_Ip[16];
extern char g_SessionSize;

extern int CreateSession(void *);
extern void* Process(const void *session, void *msg, int len);
extern int DestroySession(void *);


OPENWATERS_API OpenWaters *CreateOpenWaters(const char *key)
{
	OpenWaters *openWaters = (OpenWaters*)malloc(sizeof(OpenWaters));
	if (openWaters)
	{
		g_KeyLen = (int)strlen(key);
		g_Key = malloc(g_KeyLen + 1);
		strcpy_s(g_Key, g_KeyLen + 1, key);
		memset(openWaters->m_ActivityId, 0, OW_ID_LEN);
		memset(openWaters->m_Data, 0, OW_DATA_LEN);
		memset(openWaters->m_Memo, 0, OW_MEMO_LEN);

		void *session = malloc(sizeof(g_SessionSize));
		if (session != NULL) {
			CreateSession(session);
			openWaters->m_Connection = (void *)session;
		}
		return openWaters;
	}
	return NULL;
}

OPENWATERS_API void SetData(const char *id, const char *data, const char *memo, OpenWaters *openWaters)
{
	if (id != NULL) {
		strcpy_s(openWaters->m_ActivityId, OW_ID_LEN, id);
	}
	if (data != NULL) { 
		strcpy_s(openWaters->m_Data, OW_DATA_LEN, data);
	}
	if (memo != NULL)  {
		strcpy_s(openWaters->m_Memo, OW_MEMO_LEN, memo);
	}
}


OPENWATERS_API int PostRequest(OpenWaters *openWaters)
{
	int code = -1;
	const char *header_fmt = "POST /data?apikey=%s HTTP/1.1\r\n" \
		"Host: %s\r\n" \
		"Content-Type: text/plain\r\n" \
		"Content-Length: %d\r\n" \
		"User-Agent: OpenWatersAPI\r\n\r\n";
	
	const char *body_fmt = "{\r\n\"activityId\": %s,\r\n\"data\": \"%s\",\r\n\"memo\": \"%s\"\r\n}";
	
	int bodyLen = strlen(body_fmt) +
		strlen(openWaters->m_ActivityId) +
		strlen(openWaters->m_Data) +
		strlen(openWaters->m_Memo) + 8;

	char *bodyMsg = malloc(bodyLen * sizeof (char));
	if (bodyMsg == NULL) {
		return code;
	}
	snprintf(bodyMsg, bodyLen, body_fmt, openWaters->m_ActivityId, openWaters->m_Data, openWaters->m_Memo);
	bodyLen = strlen(bodyMsg);
	size_t msgLen = strlen(header_fmt) + g_KeyLen + strlen(g_Ip) + bodyLen;
	char *message = (char*)malloc(msgLen * sizeof(char));
	if (message == NULL) {
		return code;
	}
	memset(message, 0, msgLen);
	snprintf(message, msgLen, header_fmt, g_Key, g_Ip, bodyLen);
	memmove(message + strlen(message), bodyMsg, bodyLen);
	char *revbuf = Process(openWaters->m_Connection, message, (int)strlen(message));
	if (revbuf != NULL) {
		sscanf_s(revbuf, "%*s%d", &code);
		free(revbuf);
	}

	free(bodyMsg);
	free(message);
	return code;
}

OPENWATERS_API int GetRequest(OpenWaters *openWaters)
{
	int code = -1;
	const char *msg_fmt = "GET /data?apikey=%s&activityId=%s HTTP/1.1\r\n" \
		"Host: %s\r\n" \
		"User-Agent: OpenWatersAPI\r\n" \
		"\r\n";

	size_t msgLen = strlen(msg_fmt) + g_KeyLen + strlen(openWaters->m_ActivityId) + 8;
	char *message = (char*)malloc(msgLen * sizeof(char));
	if (message == NULL) {
		return code;
	}
	snprintf(message, msgLen, msg_fmt, g_Key, openWaters->m_ActivityId, g_Ip);
	char *revbuf = Process(openWaters->m_Connection, message, (int)strlen(message));
	
	//convert revbuf to struct;
	if (revbuf != NULL)	{
		sscanf_s(revbuf, "%*s%d", &code);
	}
	//

	if (revbuf != NULL) free(revbuf);
	if (message != NULL) free(message);
	return code;
}

OPENWATERS_API void DestroyOpenWaters(OpenWaters *openWaters)
{
	if (g_Key != NULL)
	{
		free(g_Key);
	}
	if (openWaters != NULL)
	{
		if (openWaters->m_Connection != NULL)
		{
			DestroySession(openWaters->m_Connection);
			free(openWaters->m_Connection);
		}
		free(openWaters);
	}
	
}
