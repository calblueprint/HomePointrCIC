require 'test_helper'

class InfosControllerTest < ActionDispatch::IntegrationTest
  test "should get create" do
    get infos_create_url
    assert_response :success
  end

end
