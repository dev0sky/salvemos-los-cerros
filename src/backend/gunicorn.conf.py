import multiprocessing
import os

# Server socket
bind = "0.0.0.0:8000"
backlog = 2048

# Worker processes
# Generally 2-4 x $(NUM_CORES) workers. 
# Since we are in a container, we can default to a safe number or use multiprocessing.cpu_count()
workers = multiprocessing.cpu_count() * 2 + 1
worker_class = 'sync'
worker_connections = 1000
timeout = 30
keepalive = 2

# Process naming
proc_name = 'gunicorn_django'

# Logging
errorlog = '-'
loglevel = 'info'
accesslog = '-'
access_log_format = '%(h)s %(l)s %(u)s %(t)s "%(r)s" %(s)s %(b)s "%(f)s" "%(a)s"'

# Reload
# Reload is useful for development, but for production it should be False.
# We can use an env var to toggle it if needed, but usually Docker handles restarts.
reload = os.environ.get('DEBUG', 'False') == 'True'
