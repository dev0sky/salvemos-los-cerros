import os
import time
import subprocess
from dotenv import load_dotenv
from shutil import which as shutil_which
load_dotenv()

def main():
    cmd = "docker-compose" if shutil_which("docker-compose") else "docker compose"

    confirmation = input("Are you sure you want to continue? (y/n): ")
    if confirmation.lower() != "y":
        print("Operation aborted by user.")
        return

    print("Select containers to recreate:")
    print("1. All")
    print("2. Django")
    print("3. Redis")
    print("4. PostgreSQL")
    print("5. Nginx")
    selection = input("Enter your choice (comma-separated for multiple, e.g., 1,2,3): ")

    if "1" in selection:
        # Apagar y recrear todos los contenedores
        subprocess.run([cmd, "down", "-v", "--rmi", "all", "--remove-orphans"])
        subprocess.run([cmd, "-p", f"{os.getenv('APP_NAME')}", "up", "--build", "--force-recreate", "-d"]) 

    else:
        containers = []
        if "2" in selection:
            containers.append('api')
        if "3" in selection:
            containers.append('redis')
        if "4" in selection:
            containers.append('psql')
        if "5" in selection:
            containers.append('nginx')

        if containers:
            # Apagar los contenedores seleccionados
            subprocess.run([cmd, "down"] + containers)

            # Reconstruir los contenedores sin usar la caché
            subprocess.run([cmd, "build", "--no-cache"] + containers)

            # Levantar los contenedores seleccionados
            subprocess.run([cmd, "up", "--force-recreate", "-d"] + containers)

            print("Sleeping for 15 seconds...")
            time.sleep(15)
        else:
            print("No valid selection made. Operation aborted.")

if __name__ == "__main__":
    main()