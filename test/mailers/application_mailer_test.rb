# frozen_string_literal: true

require 'test_helper'

class ApplicationMailerTest < ActionMailer::TestCase
  test 'new_app' do
    # Create the email and store it for further assertions
    @application = Application.create(status: 1, property_id: 2, info_id: 15)
    email = ApplicationsMailer.with(application: @application).new_application.deliver_now

    # Send the email, then test that it got queued
    assert_emails 1 do
      email.deliver_now
    end

    # Test the body of the sent email contains what we expect it to
    assert_equal ['me@example.com'], email.from
    assert_equal ['friend@example.com'], email.to
    assert_equal 'You have been invited by me@example.com', email.subject
    assert_equal read_fixture('new_app').join, email.body.to_s
  end
end
