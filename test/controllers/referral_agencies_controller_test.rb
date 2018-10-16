require 'test_helper'

class ReferralAgenciesControllerTest < ActionDispatch::IntegrationTest
  test "should get create" do
    get referral_agencies_create_url
    assert_response :success
  end

  test "should get show" do
    get referral_agencies_show_url
    assert_response :success
  end

  test "should get update" do
    get referral_agencies_update_url
    assert_response :success
  end

  test "should get delete" do
    get referral_agencies_delete_url
    assert_response :success
  end

end
