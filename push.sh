#!/bin/bash
dpkg-scanpackages ./repo > Packages
bzip2 -fks Packages
