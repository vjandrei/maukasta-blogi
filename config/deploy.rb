require 'mina/bundler'
require 'mina/rails'
require 'mina/git'
require 'mina/rbenv'  # for rbenv support. (http://rbenv.org)
# require 'mina/rvm'    # for rvm support. (http://rvm.io)

# Basic settings:
#   domain       - The hostname to SSH to.
#   deploy_to    - Path to deploy into.
#   repository   - Git repo to clone from. (needed by mina/git)
#   branch       - Branch name to deploy. (needed by mina/git)

# give me normal output
set :term_mode, nil

# server ip or domain
set :domain,'maukasta.fi'

# deploy directory
set :deploy_to, '/var/www/maukasta.fi/public_html/'
# apache or nginx serve directory

# repo and branch
set :repository, 'https://github.com/vjandrei/maukasta-blogi.git'
set :branch, 'master'

# Optional settings:
set :user, 'root'   # Username in the server.

# Set rbenv path.
set :rbenv_path, "/home/deploy/.rbenv"

# This task is the environment that is loaded for most commands, such as
# `mina deploy` or `mina rake`.
task :environment do
  queue %{export RBENV_ROOT=#{rbenv_path}}
  invoke :'rbenv:load'
end

desc "Deploys the current version to the server."
task :deploy => :environment do
  deploy do
    invoke :'git:clone'
    invoke :'bundle:install'
    queue "#{bundle_prefix} jekyll build"
  end
end