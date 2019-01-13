# frozen_string_literal: true

require 'test_helper'

class LandlordsControllerTest < ActionDispatch::IntegrationTest
  test 'should get create' do
    get landlords_create_url
    assert_response :success
  end

  test 'should get show' do
    get landlords_show_url
    assert_response :success
  end

  test 'should get update' do
    get landlords_update_url
    assert_response :success
  end

  test 'should get delete' do
    get landlords_delete_url
    assert_response :success
  end
end
