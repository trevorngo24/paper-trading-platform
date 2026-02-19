import sqlalchemy as sa

engine = sa.create_engine("sqlite:///tradesim.db") # we are trying to make the database engine
connection = engine.connect() # we are trying to make an connection to the database
print(engine)
metadata = sa.MetaData() # creates an object that stores table definitions (schema)
user_table = sa.Table( # creates the table and call its user
    "user",
    metadata,
    sa.Column("username", sa.String, primary_key = True ),
    sa.Column("email", sa.String),
    sa.Column("password", sa.String),
)
metadata.create_all(engine)
#print(user_table.username)
def insert_user(username: str, email: str) -> None:
    query = user_table.insert().values(username = username, email = email) # we made sure the input that was passed matches the condition that was in the database
    connection.execute(query)

def search_user(username: str):
    query = user_table.select().where(user_table.c.username == username) # Go to the user table and find the row where the username equals the value I passed in.
    return result.fetchone()
print(search_user("trevor"))

def main() -> None:
    metadata.create_all(engine)
    insert_user("Trevor", "trevorngo14@gmail.com")
    print(search_user("Trevor"))
    connection.close()

main()
    