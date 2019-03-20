class RemoveLocalCouncilStatusFromTenants < ActiveRecord::Migration[5.2]
  def change
    remove_column :tenants, :local_council_status
  end
end
