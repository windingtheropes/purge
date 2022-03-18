# purge
a simple tool to scan and clear files or folders from a directory

# usage
run purge with the directory/file name you'd like to delete, and the folder you'd like to search.

## example
`purge hi C:/`

# flags
here is a list of flags to customize and configure the use of purge

flags are included all in one string, preceeded by a dash.

## example
`purge hi C:/ -fdy`

# types
types are required for purge to run properly. types are `f` (file) or `d` (directory)

# log options
if you'd like to log the progress to purge.log.txt, use `l` for simple logs, or `L` for verbose logs. Use `o` to overwrite, otherwise the logs will be appended to the existing log file.

# verbose
use `v` to print all progress while purge searches.

# don't ask
use `y` and you won't be asked for confirmation to delete a file matching your query.
