Rails.application.routes.draw do
  
  resources :properties
  resources :tenants
  resources :applications
  resources :infos
  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
