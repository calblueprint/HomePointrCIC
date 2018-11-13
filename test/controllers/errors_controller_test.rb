require 'test_helper'

class ErrorsControllerTest < ActionDispatch::IntegrationTest
  test "should get show" do
    get errors_show_url
    assert_response :success
  end

end
