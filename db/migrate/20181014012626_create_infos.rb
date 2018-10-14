class CreateInfos < ActiveRecord::Migration[5.2]
  def change
    create_table :infos do |t|
      t.references :tenant, index: true
      t.timestamps
    end
  end
end
