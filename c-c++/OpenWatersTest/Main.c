#include <stdio.h>
#include "config.h"
#include "OpenWaters.h"

int main()
{
	OpenWaters *ow = CreateOpenWaters(""); //Insert Key
	SetData("123", NULL, NULL, ow);
	int code = GetRequest(ow);
	//SetData("123", "{lat: 37.7749, long: 122.4194, id: 12}", "checking", ow);
	//int code = PostRequest(ow);
	DestroyOpenWaters(ow);
	return 0;
}
