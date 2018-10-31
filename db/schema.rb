# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2018_10_27_200859) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "applications", force: :cascade do |t|
    t.integer "status"
    t.bigint "property_id"
    t.bigint "info_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["info_id", "property_id"], name: "index_applications_on_info_id_and_property_id", unique: true
    t.index ["info_id"], name: "index_applications_on_info_id"
    t.index ["property_id"], name: "index_applications_on_property_id"
  end

  create_table "infos", force: :cascade do |t|
    t.bigint "tenant_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["tenant_id"], name: "index_infos_on_tenant_id"
  end

  create_table "properties", force: :cascade do |t|
    t.integer "capacity"
    t.text "description"
    t.bigint "landlord_id"
    t.integer "rent"
    t.integer "size"
    t.integer "property_type"
    t.integer "housing_type"
    t.date "date_available"
    t.integer "location"
    t.index ["landlord_id"], name: "index_properties_on_landlord_id"
  end

  create_table "tenants", force: :cascade do |t|
    t.string "name"
    t.text "description"
    t.string "email"
    t.string "phone"
    t.string "nino"
    t.integer "rent_min"
    t.integer "rent_max"
    t.integer "housing_type"
    t.integer "property_type"
    t.integer "num_bedrooms"
    t.integer "location"
    t.bigint "referral_agency_id"
    t.date "date_needed"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["referral_agency_id"], name: "index_tenants_on_referral_agency_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.string "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string "unconfirmed_email"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "name"
    t.string "address"
    t.string "phone"
    t.string "type"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

end
