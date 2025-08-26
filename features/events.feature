Feature: Events Feature

    Scenario: Verify events page title
        Given user on to the home page for events
        When User clicks on menu and click on events link
        Then User should see the events page title

    Scenario: Verify Events page URL
        Given user on to the home page for events
        When User clicks on menu and click on events link
        Then User should see the events page URL
    Scenario: Verify Events page Menu Item Link
        Given user on to the home page for events
        When User clicks on menu and click on events link
        And click on navigation menu link 2nd time for events link
        Then events link should be display with '/ events' menuitem
    Scenario: Verify Events page cards
        Given user on to the home page for events
        When User clicks on menu and click on events link
        Then User should see the '2' events page cards
    Scenario: Verify Events button hover
        Given user on to the home page for events
        When User clicks on menu and click on events link
        Then User should see the Events button hover in orange color
    Scenario: Verify Events Read More Links
        Given user on to the home page for events
        When User clicks on menu and click on events link
        Then User should see the Read More Links '2' times in events page
    Scenario: Verify Events Page Heading
        Given user on to the home page for events
        When User clicks on menu and click on events link
        Then User should see the page heading as 'Events' in events page
    Scenario: Verify Events Page Background
        Given user on to the home page for events
        When User clicks on menu and click on events link
        Then User should see the page background image in events page
    Scenario: Verify Events Additional Page Title
        Given user on to the home page for events
        When User clicks on menu and click on events link
        Then User should see the Additional page Title as 'Events' in events page
    Scenario: Verify Events heading Page Title font size
        Given user on to the home page for events
        When User clicks on menu and click on events link
        Then User should see the page heading font size as '80px' in events page
    Scenario: Verify Events Additional Page Title font size
        Given user on to the home page for events
        When User clicks on menu and click on events link
        Then User should see the events page Additional heading font size as '160px'