
#ifndef ARMADA_H
#define ARMADA_H 1

#include "config.h"

// This class is exported from the Armada.dll
typedef struct openWaters
{
	char *m_Key;
	char *m_ActivityId;
	char *m_Data;
	char *m_Memo;
	int m_Code;
	void *m_Connection;
	// TODO: add your methods here.
} OpenWaters;

//add document
OPENWATERS_API OpenWaters *CreateOpenWaters();

//add document
OPENWATERS_API void SetData(
	const char *key,
	const char *id,  
	const char *data,
	const char *memo,
	OpenWaters *
);

//add document
OPENWATERS_API void PostRequest(OpenWaters *openWaters);

//add document
OPENWATERS_API void GetRequest(OpenWaters *openWaters);

OPENWATERS_API void DestroyOpenWaters(OpenWaters **openWaters);

#endif
