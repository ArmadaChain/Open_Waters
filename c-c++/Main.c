#include <stdio.h>
#include "config.h"
#include "OpenWaters.h"

int main()
{
	OpenWaters *ow = CreateOpenWaters("XriiU6sm19UUCJwm15ky");
	SetData("123", NULL, NULL, ow);
	int code = GetRequest(ow);
	//SetData("123", "{lat: 37.7749, long: 122.4194, id: 12}", "checking", ow);
	//int code = PostRequest(ow);
	DetroyOpenWaters(ow);
	return 0;
}
