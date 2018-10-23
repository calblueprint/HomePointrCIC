require 'test_helper'

class TenantsControllerTest < ActionDispatch::IntegrationTest
  test "should get create" do
    get tenants_create_url
    assert_response :success
  end

  test "should get show" do
    get tenants_show_url
    assert_response :success
  end

  test "should get update" do
    get tenants_update_url
    assert_response :success
  end

  test "should get delete" do
    get tenants_delete_url
    assert_response :success
  end

end
