Feature: Login Feature

  Scenario: Successful login with valid credentials
    Given User navigates to the login page
    When User enters email "demo@demo.com" and password "demo"
    Then User should see the secure area

  Scenario: Invalid Email
    Given User navigates to the login page
    When User enters email "demo1@demo.com" and password "demo"
    Then User should see the Invalid email error message

  Scenario: Invalid password
    Given User navigates to the login page
    When User enters email "demo@demo.com" and password "Password123$"
    Then User should see the Invalid password error message

  Scenario: Blank scenario
    Given User navigates to the login page
    When User enters email " " and password " "
    And User clicks on the login button without input email or password
    Then User should see the Invalid email and password error messages

  Scenario: Logout User
    Given User navigates to the login page
    When User enters email "demo@demo.com" and password "demo"
    And User clicks on the logout button
    Then User should be redirected to the login page


