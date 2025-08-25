Feature: aboutus Feature

    Scenario: Verify Aboutus page Title
        Given user on to the home page for about us
        When user opens the navigation menu and navigates to Aboutus page
        Then about use page title should be displayed

    Scenario: Verify Aboutus page heading
        Given user on to the home page for about us
        When user opens the navigation menu and navigates to Aboutus page
        Then about use page heading should be displayed as 'Kailash Pathak'

    Scenario: Verify Aboutus page AuthorHeading Underline
        Given user on to the home page for about us
        When user opens the navigation menu and navigates to Aboutus page
        Then about use page heading underline should be displayed in  'Kailash Pathak'

    Scenario: Verify Aboutus page AuthorTitle Underline
        Given user on to the home page for about us
        When user opens the navigation menu and navigates to Aboutus page
        Then about use page Title underline should be displayed in 'QAAutomationLabs'

    Scenario: Verify Aboutus page Menu Item Link
        Given user on to the home page for about us
        When user opens the navigation menu and navigates to Aboutus page
        And click on navigation menu link 2nd time
        Then about us link should be display with '/ About' menuitem
    Scenario: Verify Aboutus page Menu Item Links
        Given user on to the home page for about us
        When user opens the navigation menu and navigates to Aboutus page
        Then there are '10' link should be displayed.

