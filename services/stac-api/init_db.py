import psycopg2
import os
import sys
import time

def check_pgstac():
    dbname = os.getenv("PGDATABASE", "postgis")
    user = os.getenv("PGUSER", "pgstac")
    password = os.getenv("PGPASSWORD", "pgstac_secret")
    host = os.getenv("PGHOST", "stac-db")
    port = os.getenv("PGPORT", "5432")

    print(f"Connecting to {host}:{port}/{dbname} as {user}...")
    
    retries = 10
    conn = None
    while retries > 0:
        try:
            conn = psycopg2.connect(
                dbname=dbname,
                user=user,
                password=password,
                host=host,
                port=port
            )
            break
        except Exception as e:
            print(f"Waiting for database... ({retries} retries left)")
            retries -= 1
            time.sleep(2)
    
    if not conn:
        print("Could not connect to database")
        sys.exit(1)

    try:
        with conn.cursor() as cur:
            cur.execute("SELECT version();")
            print(f"PostgreSQL version: {cur.fetchone()[0]}")
            
            cur.execute("SELECT schema_name FROM information_schema.schemata WHERE schema_name = 'pgstac';")
            if cur.fetchone():
                print("PgSTAC schema found.")
                
                # Check pgstac version
                try:
                    cur.execute("SELECT get_setting('version');")
                    version = cur.fetchone()[0]
                    print(f"PgSTAC version: {version}")
                except:
                    print("Could not retrieve PgSTAC version (might be old or using different function)")
            else:
                print("PgSTAC schema NOT found! Ensure stac-db is using the correct image.")
                sys.exit(1)
                
    except Exception as e:
        print(f"Error during check: {e}")
        sys.exit(1)
    finally:
        conn.close()

if __name__ == "__main__":
    check_pgstac()
