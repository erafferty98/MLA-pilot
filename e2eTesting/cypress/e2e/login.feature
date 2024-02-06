Feature: login
  Scenario: logging in
    Given I am a logged in user
    When I track an exercise
    Then it should show up