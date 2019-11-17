

#ifndef CONFIG_H
#define CONFIG_H 1


#define OW_ID_LEN  1024
#define OW_DATA_LEN  1024
#define OW_MEMO_LEN  256
#define OW_BUF_REV 1024

// The following ifdef block is the standard way of creating macros which make exporting 
// from a DLL simpler. All files within this DLL are compiled with the ARMADA_EXPORTS
// symbol defined on the command line. This symbol should not be defined on any project
// that uses this DLL. This way any other project whose source files include this file see 
// ARMADA_API functions as being imported from a DLL, whereas this DLL sees symbols
// defined with this macro as being exported.
#ifdef OW_EXPORTS
#define OPENWATERS_API __declspec(dllexport)
#else
#define OPENWATERS_API __declspec(dllimport)
#endif


#endif
