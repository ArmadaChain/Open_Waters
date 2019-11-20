#This is Makefile to create a shared library in C

CC = gcc
CFLAGS = -fPIC -Wall -O2 -g
LDFLAGS = -shared
RM = rm -rf
OUTDIR = ../lib/linux
TARGET_LIB = ../lib/linux/libopenwaters.so
INCLUDE = -I../include

SRCS = Connect.c OpenWaters.c
OBJS = $(SRCS:%.c=%.o) 

.PHONY: make_out_dir all
all: $(OUTDIR)  $(TARGET_LIB)

$(TARGET_LIB): $(OBJS)
	$(CC) ${LDFLAGS} -o $@ $^

%.o:%.c
	@echo $(*F).c
	$(CC) $(INCLUDE) $(CFLAGS) -c $< -o $@

$(OUTDIR):
	@echo "Folder $(directory) does not exist"
	mkdir -p $@

.PHONY: clean

clean:
	${RM} ${TARGET_LIB} ${OBJS} 


