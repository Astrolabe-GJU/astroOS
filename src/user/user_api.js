export async function createIfGuestUser() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("astroOS", 1);

    request.onerror = function (event) {
      reject("Database error: " + event.target.errorCode);
    };

    request.onsuccess = function (event) {
      const db = event.target.result;
      // Create transaction and object store
      const transaction = db.transaction(["users"], "readwrite");
      const store = transaction.objectStore("users");

      const getRequest = store.get("user");

      getRequest.onsuccess = function (event) {
        const guest = event.target.result;
        if (guest) {
          // Meaning there's a guest

          resolve(guest.username);
        } else {
          saveUserAccount("user", "password");
          resolve("none");
        }
      };

      getRequest.onerror = function (event) {
        reject(
          "@createGuestUser() :: user_api.js Error: " + event.target.errorCode
        );
      };
    };
  });
}

export function saveUserAccount(username, password) {
  // Open or create IndexedDB database
  const request = indexedDB.open("astroOS", 1);

  request.onerror = function (event) {
    console.error("Database error: " + event.target.errorCode);
  };

  request.onsuccess = function (event) {
    const db = event.target.result;
    // Create transaction and object store
    const transaction = db.transaction(["users"], "readwrite");
    const store = transaction.objectStore("users");
    // Add user account data
    const account = { username: username, password: password };
    const addRequest = store.add(account);

    addRequest.onsuccess = function (event) {
      console.log("User account added successfully");
    };

    addRequest.onerror = function (event) {
      console.error("Error adding user account: " + event.target.errorCode);
    };
  };
}
export async function getUsername() {
  let username = "";
  await getUsersFromDb()
    .then((records) => {
      if (records.length == 1) {
        // emit guest
        username = records[0];
      } else {
        // @TODO
        // emit username using a proper logic
        username = records[0] != "user" ? records[0] : records[1];
      }
    })
    .catch((error) => {
      console.error("ERROR: ", error);
    });

  return username;
}

function getUsersFromDb() {
  return new Promise((resolve, reject) => {
    // Open the IndexedDB database
    const request = indexedDB.open("astroOS", 1);

    request.onerror = function (event) {
      reject("Database error: " + event.target.errorCode);
    };

    request.onsuccess = function (event) {
      const db = event.target.result;
      // Start a new transaction to read from the object store
      const transaction = db.transaction(["users"], "readonly");
      const store = transaction.objectStore("users");
      // Open a cursor to iterate over all records
      const cursorRequest = store.openCursor();

      const records = [];

      cursorRequest.onsuccess = function (event) {
        const cursor = event.target.result;
        if (cursor) {
          // Push record into array
          records.push(cursor.value.username);
          // Move to next record
          cursor.continue();
        } else {
          // Resolve promise with all records
          resolve(records);
        }
      };

      cursorRequest.onerror = function (event) {
        reject("Error fetching records: " + event.target.errorCode);
      };
    };
  });
}
