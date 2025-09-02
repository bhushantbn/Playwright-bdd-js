Feature: Contact Us Feature

    Scenario: Verify Contact Page title
        Given user on to the home page for contact page
        When User clicks on menu and click on Contact link
        Then Contact Page title should be visible
    Scenario: Verify Contact page Menu Item Link
        Given user on to the home page for contact page
        When User clicks on menu and click on Contact link
        And click on navigation menu link 2nd time for Contact link
        Then contacts link should be display with '/ Contacts' menuitem
    Scenario: Verify Contact Page URL
        Given user on to the home page for contact page
        When User clicks on menu and click on Contact link
        Then User should see the Contact page URL

    Scenario: Fill Contact form
        Given user on to the home page for contact page
        When User clicks on menu and click on Contact link
        And User should redirect to contact Page
        And User fill the contact form and click on submit button
        Then User should see the success message

    Scenario: Blank Scenario for Contact Form
        Given user on to the home page for contact page
        When User clicks on menu and click on Contact link
        And User click on submit button without fill form
        Then Require field message should be visible
    Scenario: Positive Scenario for contact page
        Given User on to the home page for contact page
        When User clicks on menu and click on Contact link
        And User click on submit button
        Then success message should be visible
    Scenario: Verify Send message Hover Action
        Given user on to the home page for contact page
        When User clicks on menu and click on Contact link
        Then User should see the send message button hover in orange color
    Scenario: Verify Underline Text for Touch text
        Given user on to the home page for contact page
        When User clicks on menu and click on Contact link
        Then Underline should be display within Touch Text
    Scenario: Verify Contact us page heading
        Given user on to the home page for contact page
        When User clicks on menu and click on Contact link
        Then Contact page heading should be display
    Scenario: Verify Contact us page sub heading
        Given user on to the home page for contact page
        When User clicks on menu and click on Contact link
        Then Contact page additional heading should be display
    Scenario: Verify Invalid email Message
        Given user on to the home page for contact page
        When User clicks on menu and click on Contact link
        And User fill form with invalid email
        Then Invalid email validation message should be display
    Scenario: Verify Contact information
        Given user on to the home page for contact page
        When User clicks on menu and click on Contact link
        Then Contact Details should be visible
    Scenario: Verify Background image
        Given user on to the home page for contact page
        When User clicks on menu and click on Contact link
        Then Verify Background Image URL