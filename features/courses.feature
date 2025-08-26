Feature: Courses Feature

    Scenario: Verify Courses page title
        Given user on to the home page for courses
        When User clicks on menu and click on courses link
        Then User should see the Courses page title

    Scenario: Verify Course page URL
        Given user on to the home page for courses
        When User clicks on menu and click on courses link
        Then User should see the Courses page URL
    Scenario: Verify Course page Menu Item Link
        Given user on to the home page for courses
        When User clicks on menu and click on courses link
        And click on navigation menu link 2nd time for courses link
        Then courses link should be display with '/ Courses' menuitem
    Scenario: Verify Courses page cards
        Given user on to the home page for courses
        When User clicks on menu and click on courses link
        Then User should see the Courses page cards
    Scenario: Verify Course button hover
        Given user on to the home page for courses
        When User clicks on menu and click on courses link
        Then User should see the Course button hover in orange color
    Scenario: Verify Course Read More Links
        Given user on to the home page for courses
        When User clicks on menu and click on courses link
        Then User should see the Read More Links '3' times
    Scenario: Verify Course Page Heading
        Given user on to the home page for courses
        When User clicks on menu and click on courses link
        Then User should see the page heading as 'Courses'
    Scenario: Verify Course Page Background
        Given user on to the home page for courses
        When User clicks on menu and click on courses link
        Then User should see the page background image
    Scenario: Verify Course Additional Page Title
        Given user on to the home page for courses
        When User clicks on menu and click on courses link
        Then User should see the Additional page Title as 'Courses'
    Scenario: Verify Course heading Page Title font size
        Given user on to the home page for courses
        When User clicks on menu and click on courses link
        Then User should see the page heading font size as '80px'
    Scenario: Verify Course Additional Page Title font size
        Given user on to the home page for courses
        When User clicks on menu and click on courses link
        Then User should see the page Additional heading font size as '160px'
