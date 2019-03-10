#!/bin/bash

#from: https://github.com/voxpelli/node-connect-pg-simple/blob/HEAD/table.sql

psql -U postgres -h localhost -d lcpg -a -f session_store_tbl.sql

