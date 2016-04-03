module Jekyll
  class TagsGenerator < Generator
    def generate(site)
        tags_dir = Dir.pwd + '/avainsanat'

        if !Dir.exists?(tags_dir)
            puts "Creating avainsanat dir"
            Dir.mkdir(tags_dir)
        end
        regenerate_flag = false

        site.tags.each do |i|
            tag_name = i[0]

             if !File.exists?(tags_dir + '/' + tag_name)
                puts "Creating tag page for: " + tag_name
                tag_file = File.new(tags_dir + '/' + tag_name, "w")
                tag_file.puts("---\nlayout: avainsanat\ntag: " + tag_name + "\npermalink: /avainsanat/" + tag_name + "/\navoid_main_menu: true\n---")
                tag_file.close

                regenerate_flag = true
            end
        end

        if regenerate_flag
            FileUtils.touch Dir.pwd+'/_config.yml'
        end



    end
  end

end
