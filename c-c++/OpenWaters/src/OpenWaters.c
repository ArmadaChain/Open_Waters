// OpenWaters.cpp : Defines the exported functions for the DLL application.
//
#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include "config.h"
#include "OpenWaters.h"

extern char g_Ip[16];

extern int CreateSession(void **);
extern void* Process(const void *session, void *msg, int len);
extern void DestroySession(void **);


OPENWATERS_API OpenWaters *CreateOpenWaters()
{
	OpenWaters *openWaters = (OpenWaters*)malloc(sizeof(OpenWaters));
	if (openWaters)
	{
		openWaters->m_Key = NULL;
		openWaters->m_ActivityId = NULL;
		openWaters->m_Data = NULL;
		openWaters->m_Memo = NULL;
		openWaters->m_Code = -1;
		openWaters->m_Connection = NULL;
		if (CreateSession(&(openWaters->m_Connection)) < 0)
		{
			printf("Can't connect to server.");
		}
		return openWaters;
	}
	return NULL;
}

OPENWATERS_API void SetData(
	const char *key, const char *id, 
	const char *data, const char *memo, 
	OpenWaters *openWaters)
{
	if (key != NULL)
	{
		size_t len = strlen(key) + 1;
		openWaters->m_Key = malloc(len);
		memcpy(openWaters->m_Key, key, len);
	}
	if (id != NULL) {
		size_t len = strlen(id) + 1;
		openWaters->m_ActivityId = malloc(len);
		memcpy(openWaters->m_ActivityId, id, len);
	}
	if (data != NULL) { 
		size_t len = strlen(data) + 1;
		openWaters->m_Data = malloc(len);
		memcpy(openWaters->m_Data, data, len);
	}
	if (memo != NULL)  {
		size_t len = strlen(memo) + 1;
		openWaters->m_Memo = malloc(len);
		memcpy(openWaters->m_Memo, memo, len);
	}
}

OPENWATERS_API void PostRequest(OpenWaters *openWaters)
{
	if (openWaters != NULL &&
		openWaters->m_Key != NULL &&
		openWaters->m_ActivityId != NULL &&
		openWaters->m_Data != NULL &&
		openWaters->m_Memo != NULL) 
	{
		const char *header_fmt = "POST /data?apikey=%s HTTP/1.1\r\n"
			"Host: %s\r\n"
			"Content-Type: text/plain\r\n"
			"Content-Length: %d\r\n"
			"User-Agent: OpenWatersAPI\r\n\r\n";

		const char *body_fmt = "{\r\n\"activityId\": %s,\r\n\"data\": \"%s\",\r\n\"memo\": \"%s\"\r\n}";

		//6 bytes for "%s" character and 1 byte for end of string;
		unsigned short bodyLen = (strlen(body_fmt) - 6 +
			strlen(openWaters->m_ActivityId) +
			strlen(openWaters->m_Data) +
			strlen(openWaters->m_Memo)) * sizeof(char) + 1;

		char *bodyMsg = malloc(bodyLen);
		if (bodyMsg == NULL) {
			return;
		}
		memset(bodyMsg, 0, bodyLen);
		snprintf(bodyMsg, bodyLen, body_fmt, openWaters->m_ActivityId, openWaters->m_Data, openWaters->m_Memo);
		bodyLen = strlen(bodyMsg);
		size_t msgLen = strlen(header_fmt) - 6 + 
			strlen(openWaters->m_Key) + strlen(g_Ip) + 
			sizeof(unsigned short) + bodyLen;

		char *message = (char*)malloc(msgLen * sizeof(char));
		if (message == NULL) {
			return;
		}
		memset(message, 0, msgLen);
		snprintf(message, msgLen, header_fmt, openWaters->m_Key, g_Ip, bodyLen);
		memcpy(message + strlen(message), bodyMsg, bodyLen);
		char *revbuf = Process(openWaters->m_Connection, message, msgLen);
		if (revbuf != NULL) {
			sscanf(revbuf, "%*s%d", &openWaters->m_Code);
			free(revbuf);
		}

		free(bodyMsg);
		free(message);
	}
}

OPENWATERS_API void GetRequest(OpenWaters *openWaters)
{
	if (openWaters != NULL && 
		openWaters->m_Key != NULL &&
		openWaters->m_ActivityId != NULL) 
	{
		const char *msg_fmt = "GET /data?apikey=%s&activityId=%s HTTP/1.1\r\n" \
			"Host: %s\r\n" \
			"User-Agent: OpenWatersAPI\r\n" \
			"\r\n";

		size_t msgLen = (strlen(msg_fmt) +
			strlen(openWaters->m_Key) +
			strlen(openWaters->m_ActivityId) +
			strlen(g_Ip)) * sizeof(char) - 6 + 1;

		char *message = (char*)malloc(msgLen);
		if (message == NULL) {
			return;
		}
		snprintf(message, msgLen, msg_fmt, openWaters->m_Key, openWaters->m_ActivityId, g_Ip);
		char *revbuf = Process(openWaters->m_Connection, message, (int)strlen(message));

		//copy data to struct;
		if (revbuf != NULL) {
			sscanf(revbuf, "%*s%d", &openWaters->m_Code);
			char *pos1 = strchr(revbuf, '{');
			pos1 = strchr(pos1, ':') + 4;
			char *pos2 = strchr(pos1, '}') + 1;
			int len = (int)(pos2 - pos1);
			if (openWaters->m_Data != NULL)	{
				free(openWaters->m_Data);
			}
			openWaters->m_Data = malloc(len + 1);
			memset(openWaters->m_Data, 0, len + 1);
			memcpy(openWaters->m_Data, pos1, len);
		}

		if (revbuf != NULL) free(revbuf);
		if (message != NULL) free(message);
	}
}

OPENWATERS_API void DestroyOpenWaters(OpenWaters **openWaters)
{
	if ((*openWaters)->m_Key != NULL) {
		free((*openWaters)->m_Key);
	}
	if (*openWaters != NULL) {
		if ((*openWaters)->m_Connection != NULL) {
			DestroySession(&((*openWaters)->m_Connection));
		}
		if ((*openWaters)->m_ActivityId != NULL) {
			free((*openWaters)->m_ActivityId);
		}
		if ((*openWaters)->m_Data != NULL) {
			free((*openWaters)->m_Data);
		}
		if ((*openWaters)->m_Memo != NULL) {
			free((*openWaters)->m_Memo);
		}

		free(*openWaters);
		*openWaters = NULL;
	}
}
