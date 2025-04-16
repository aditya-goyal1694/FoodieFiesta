from dotenv import load_dotenv
import mysql.connector
import os
global cnx

load_dotenv()

cnx = mysql.connector.connect(
    host=os.getenv("DB_HOST"),
    user=os.getenv("DB_USER"),
    password=os.getenv("DB_PASSWORD"),
    database=os.getenv("DB_NAME"),
    port=int(os.getenv("DB_PORT"))
)


# Function to insert an order item directly into the orders table
def insert_order_item(food_item, quantity, order_id):
    try:
        cursor = cnx.cursor()

        # Fetch the item_id and price for the food item
        query = f"SELECT item_id, price FROM food_items WHERE name = '{food_item}'"
        cursor.execute(query)
        result = cursor.fetchone()

        if not result:
            print(f"Food item {food_item} not found!")
            cursor.close()
            return -1

        item_id, price = result
        total_price = price * quantity

        # Insert the order item directly into the orders table
        insert_query = f"""
            INSERT INTO orders (order_id, item_id, quantity, total_price)
            VALUES ({order_id}, {item_id}, {quantity}, {total_price})
        """
        cursor.execute(insert_query)

        # Committing the changes
        cnx.commit()

        print("Order item inserted successfully!")
        cursor.close()
        return 1

    except mysql.connector.Error as err:
        print(f"Error inserting order item: {err}")
        # Rollback changes if necessary
        cnx.rollback()
        return -1

    except Exception as e:
        print(f"An error occurred: {e}")
        # Rollback changes if necessary
        cnx.rollback()
        return -1


# Function to get the total price of the order
def get_total_order_price(order_id):
    try:
        cursor = cnx.cursor()

        # Executing the SQL query to get the total order price
        query = f"SELECT SUM(total_price) FROM orders WHERE order_id = {order_id}"
        cursor.execute(query)

        # Fetching the result
        result = cursor.fetchone()[0]

        cursor.close()
        return result if result else 0.0  # In case no items are found, return 0

    except mysql.connector.Error as err:
        print(f"Error fetching total order price: {err}")
        return -1


# Function to insert a record into the order_tracking table
def insert_order_tracking(order_id, status):
    try:
        cursor = cnx.cursor()

        # Inserting the record into the order_tracking table
        insert_query = f"INSERT INTO order_tracking (order_id, status) VALUES ({order_id}, '{status}')"
        cursor.execute(insert_query)

        # Committing the changes
        cnx.commit()
        cursor.close()

    except mysql.connector.Error as err:
        print(f"Error inserting order tracking: {err}")
        cnx.rollback()


# Function to get the next available order_id
def get_next_order_id():
    try:
        cursor = cnx.cursor()

        # Executing the SQL query to get the next available order_id
        query = "SELECT MAX(order_id) FROM orders"
        cursor.execute(query)

        # Fetching the result
        result = cursor.fetchone()[0]

        cursor.close()

        return result + 1 if result else 1

    except mysql.connector.Error as err:
        print(f"Error fetching next order id: {err}")
        return -1


# Function to fetch the order status from the order_tracking table
def get_order_status(order_id):
    try:
        cursor = cnx.cursor()

        # Executing the SQL query to fetch the order status
        query = f"SELECT status FROM order_tracking WHERE order_id = {order_id}"
        cursor.execute(query)

        # Fetching the result
        result = cursor.fetchone()

        cursor.close()

        return result[0] if result else None

    except mysql.connector.Error as err:
        print(f"Error fetching order status: {err}")
        return None


if __name__ == "__main__":
    # Example usage
    print(get_next_order_id())
