# To do (MAIN)

- ✅ Clean up all code
- ✅ JS validation
- Google maps & distance between integration
- ✅ My animals, aesthetic fix
- Edit animals, based on my animals with onclick for each edit
- ✅ Add logs page aesthetic fix and feilds added
- ✅ Login/registration aestethic fix
- Upload images
- User settings aesthetic fix
- Thorough aesthetic fix based on all wireframes - colors, sizing, etc
- Alerts

# To do (LATER)

- .env added
- UserID function done once only instead of every page click
- Check for same email, see code below
- Change name of this to Wildlife Watcher
- Santitise/strip slashes. Add to assignment sheet for validation
- setTimeout getUserID so rate limiting works
- Alerts
- headers.json().then(function(body)) only needed if returning data or an error etc. Make it an else?
- Logout goes back to login/reg page
- Logout stops logging user ID
- Back buttons for each
- Registering should log you in but it doesn't
- If switch case fails, get a 501 with an alert ['error', 'message here']
- If in switch case checks if user id inserted is the user id logged in
- DB functions should usually only return true if == 1 row updated
- Error page user arrives at if 404, 403, die() after origin fail
- use isLoggedIn() to make alerts/errors based on logged in. E.g. can't login or register when logged in
- can users add wrong id for something and make it bad for database or other users
- Structure PHP to have classes and models
- Error message for registering with email that already exists
- Error message for registering when already logged in - needs log out button
- Make template to hide json information
- Only log if response code is not 400
- Dark mode icon in switch so looks better
- About, contact me

# To do (FOR ADMIN)

- Users choose 'animal type', then they start typing a species.
- If admin has approved, the species will appear from drop down. If not they can add it.
- If they add one, that gets status of pending for admin to approve
- When updating a category, they can't delete one because it may be in use by other user. They can only add a new one

# Notes

- Check for same email function

  public function insert_user($pdo){
        $query1 = "SELECT COUNT(*) FROM users WHERE username = :u";
        $stmt1 = $pdo->prepare($query1);
  $stmt1->bindParam(":u", $this->username);
        $stmt1->execute();
        $ct = $stmt1->fetchColumn();
        if ($ct == 0) {
  $hashed_password=password_hash($this->password,PASSWORD_DEFAULT);
  $query="INSERT INTO users (firstName, lastName, username, password, emailAddress, role) VALUES(:fn,:ln,:u,:p,:em,:r)";
            $stmt=$pdo->prepare($query);
  $stmt->bindParam(":em", $this->emailAddress);
  $stmt->bindParam(":fn", $this->firstName);
  $stmt->bindParam(":ln", $this->lastName);
  $stmt->bindParam(":p", $hashed_password);
  $stmt->bindParam(":r", $this->role);
  $stmt->bindParam(":u", $this->username);
  $stmt->execute();
  return ("Saved");
  } else {
  return ("Not saved");
  }
  }
