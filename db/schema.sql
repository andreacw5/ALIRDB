-- Ricostruzione schema Altis Life (versione SQLite) per ALIRDB.
-- Livelli come stringhe, come gli enum('0','1',...) dell'originale MySQL.

CREATE TABLE players (
    uid        INTEGER PRIMARY KEY AUTOINCREMENT,
    pid        TEXT NOT NULL UNIQUE,          -- Steam64 ID
    name       TEXT NOT NULL,
    aliases    TEXT NOT NULL DEFAULT '',
    cash       INTEGER NOT NULL DEFAULT 0,
    bankacc    INTEGER NOT NULL DEFAULT 0,
    coplevel   TEXT NOT NULL DEFAULT '0',
    mediclevel TEXT NOT NULL DEFAULT '0',
    adminlevel TEXT NOT NULL DEFAULT '0',
    donorlevel TEXT NOT NULL DEFAULT '0',
    insert_time TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    last_seen   TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE gangs (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    owner      TEXT NOT NULL,                 -- pid del capo
    name       TEXT NOT NULL UNIQUE,
    members    TEXT NOT NULL DEFAULT '[]',    -- JSON array di pid
    maxmembers INTEGER NOT NULL DEFAULT 12,
    bank       INTEGER NOT NULL DEFAULT 0,
    active     INTEGER NOT NULL DEFAULT 1
);

CREATE TABLE vehicles (
    id        INTEGER PRIMARY KEY AUTOINCREMENT,
    side      TEXT NOT NULL,                  -- civ | cop | med
    classname TEXT NOT NULL,
    type      TEXT NOT NULL,                  -- Car | Air | Ship
    pid       TEXT NOT NULL REFERENCES players(pid),
    alive     INTEGER NOT NULL DEFAULT 1,
    active    INTEGER NOT NULL DEFAULT 0,
    plate     TEXT NOT NULL,
    color     TEXT NOT NULL
);

CREATE TABLE wanted (
    wantedID     TEXT PRIMARY KEY REFERENCES players(pid),
    wantedName   TEXT NOT NULL,
    wantedCrimes TEXT NOT NULL DEFAULT '[]',  -- JSON array di indici crimine
    wantedBounty INTEGER NOT NULL DEFAULT 0,
    active       INTEGER NOT NULL DEFAULT 1
);
