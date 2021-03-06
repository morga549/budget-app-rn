/* Copyright 2014-present Facebook, Inc.
 * Licensed under the Apache License, Version 2.0 */
#pragma once

// Spawn attributes

typedef struct _posix_spawnattr {
  int flags;
  char *working_dir;
} posix_spawnattr_t;

#define POSIX_SPAWN_SETSIGMASK 1
#define POSIX_SPAWN_SETPGROUP 2

int posix_spawnattr_init(posix_spawnattr_t *attrp);
int posix_spawnattr_setflags(posix_spawnattr_t *attrp, int flags);
int posix_spawnattr_destroy(posix_spawnattr_t *attrp);

int posix_spawnattr_setcwd_np(posix_spawnattr_t *attrp, const char *path);

// File actions
struct _posix_spawn_file_action {
  enum {
    open_file,
    dup_fd,
    dup_handle
  } action;
  int target_fd;
  union {
    HANDLE dup_local_handle;
    int source_fd;
    struct {
      char *name;
      int flags;
      int mode;
    } open_info;
  } u;
};

typedef struct _posix_spawn_file_actions {
  struct _posix_spawn_file_action *acts;
  int nacts;
} posix_spawn_file_actions_t;

int posix_spawn_file_actions_init(posix_spawn_file_actions_t *actions);
int posix_spawn_file_actions_adddup2(posix_spawn_file_actions_t *actions,
    int fd, int target_fd);
int posix_spawn_file_actions_adddup2_handle_np(
    posix_spawn_file_actions_t *actions,
    HANDLE handle, int target_fd);
int posix_spawn_file_actions_addopen(posix_spawn_file_actions_t *actions,
    int target_fd, const char *name, int flags, int mode);
int posix_spawn_file_actions_destroy(posix_spawn_file_actions_t *actions);

// And spawning itself

int posix_spawn(pid_t *pid, const char *path,
    const posix_spawn_file_actions_t *file_actions,
    const posix_spawnattr_t *attrp,
    char *const argv[], char *const envp[]);
int posix_spawnp(pid_t *pid, const char *file,
    const posix_spawn_file_actions_t *file_actions,
    const posix_spawnattr_t *attrp,
    char *const argv[], char *const envp[]);

BOOL w_wait_for_any_child(DWORD timeoutms, DWORD *pid);
