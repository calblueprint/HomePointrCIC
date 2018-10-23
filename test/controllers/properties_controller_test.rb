require 'test_helper'

class PropertiesControllerTest < ActionDispatch::IntegrationTest
  test "should get create" do
    get properties_create_url
    assert_response :success
  end

  test "should get show" do
    get properties_show_url
    assert_response :success
  end

  test "should get update" do
    get properties_update_url
    assert_response :success
  end

  test "should get delete" do
    get properties_delete_url
    assert_response :success
  end

end
