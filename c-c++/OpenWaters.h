
#ifndef ARMADA_H
#define ARMADA_H 1



#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include "config.h"

// This class is exported from the Armada.dll
typedef struct ARMADA_API openWaters
{
	char m_ActivityId[OW_ID_LEN];
	char m_Data[OW_DATA_LEN];
	char m_Memo[OW_MEMO_LEN];
	void *m_Connection;
	// TODO: add your methods here.
} OpenWaters;

//add document
ARMADA_API OpenWaters *CreateOpenWaters(const char *key);
ARMADA_API void SetData(
	const char *id,  
	const char *data,
	const char *memo,
	OpenWaters *
);

//add document
ARMADA_API int PostRequest(OpenWaters *openWaters);

//add document
ARMADA_API int GetRequest(OpenWaters *openWaters);

ARMADA_API void DetroyOpenWaters(OpenWaters *openWaters);

#endif
