Feature: Blog Feature

    Scenario: Verify blog page title
        Given user on to the home page for blog
        When User clicks on menu and click on blog link
        Then User should see the blog page title

    Scenario: Verify blog page URL
        Given user on to the home page for blog
        When User clicks on menu and click on blog link
        Then User should see the blog page URL
    Scenario: Verify blog page Menu Item Link
        Given user on to the home page for blog
        When User clicks on menu and click on blog link
        And click on navigation menu link 2nd time for blog link
        Then blog link should be display with '/ blog' menuitem
    Scenario: Verify blog page cards
        Given user on to the home page for blog
        When User clicks on menu and click on blog link
        Then User should see the blog page cards
    Scenario: Verify blog Read More Links
        Given user on to the home page for blog
        When User clicks on menu and click on blog link
        Then User should see the Read More Links '12' times for blog page
    Scenario: Verify blog Page Heading
        Given user on to the home page for blog
        When User clicks on menu and click on blog link
        Then User should see the page heading as 'Blog' in blog page
    Scenario: Verify blog Page Background Color
        Given user on to the home page for blog
        When User clicks on menu and click on blog link
        Then User should see the page background color
    Scenario: Verify blog Additional Page Title
        Given user on to the home page for blog
        When User clicks on menu and click on blog link
        Then User should see the Additional page Title as 'Blog' in blog page
    Scenario: Verify blog heading Page Title font size
        Given user on to the home page for blog
        When User clicks on menu and click on blog link
        Then User should see the page heading font size as '80px' in blog page
    Scenario: Verify blog Additional Page Title font size
        Given user on to the home page for blog
        When User clicks on menu and click on blog link
        Then User should see the page Additional heading font size as '160px' in blog page
    Scenario: Verify blog page links
        Given user on to the home page for blog
        When User clicks on menu and click on blog link
        Then User should see all the links of blog page
    Scenario: Verify blog link hover
        Given user on to the home page for blog
        When User clicks on menu and click on blog link
        Then User should see the button hover in orange color in blog page