Feature: Login Feature

  Scenario: Successful login with valid credentials
    Given User navigates to the login page
    When User enters username "student" and password "Password123"
    Then User should see the secure area

  Scenario: Negative username test
    Given User navigates to the login page
    When User enters username "student123" and password "Password123"
    Then User should see the Invalid username error message

  Scenario: Negative password test
    Given User navigates to the login page
    When User enters username "student" and password "Password123$"
    Then User should see the Invalid password error message

  Scenario: Blank scenario
    Given User navigates to the login page
    When User enters username " " and password " "
    Then User should see the Invalid username and password error messages

  Scenario: Logout User
    Given User navigates to the login page
    When User enters username "student" and password "Password123"
    And User clicks on the logout button
    Then User should be redirected to the login page


