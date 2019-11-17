
#ifndef ARMADA_H
#define ARMADA_H 1

#include "config.h"

// This class is exported from the Armada.dll
typedef struct OPENWATERS_API openWaters
{
	char m_ActivityId[OW_ID_LEN];
	char m_Data[OW_DATA_LEN];
	char m_Memo[OW_MEMO_LEN];
	void *m_Connection;
	// TODO: add your methods here.
} OpenWaters;

//add document
OPENWATERS_API OpenWaters *CreateOpenWaters(const char *key);
OPENWATERS_API void SetData(
	const char *id,  
	const char *data,
	const char *memo,
	OpenWaters *
);

//add document
OPENWATERS_API int PostRequest(OpenWaters *openWaters);

//add document
OPENWATERS_API int GetRequest(OpenWaters *openWaters);

OPENWATERS_API void DestroyOpenWaters(OpenWaters *openWaters);

#endif
