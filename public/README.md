
Search "COMMENTS FOR JOHN" to see all comments required for PROJ2

<!-- 
COMMENTS FOR JOHN
Question 16
 -->

# How to Configure ✨ 

1. Import database
2. Configure imported database with the following settings, or alter settings in db.php:

    $dbURI = 'mysql:host=localhost;port=8889;dbname=wildlife-watcher';
    $dbconn = new PDO($dbURI, 'user1', 'user1');

3. The app should be functional. Either register your own account or use the following to login:

    email: bob@gmail.com
    password: Password!1

# How to Use Test Script

1. Install VS Code extension "Thunder Client"
2. Open Thunder Client (icon ov thunder should be on left sidebar of VS Code)
3. Click icon on the right of "filter collections"
4. Import
5. Import using the test-script.json supplied in file directory
Note for John: As I am working on the app everyday, I wouldn't be surprised if some curls possibly fail by the time you run your tests. Let me know.