// WARNING: DO NOT EDIT THIS FILE. THIS FILE IS MANAGED BY SPRING ROO.
// You may push code into the target .java compilation unit if you wish to edit any member(s).

package au.net.huni.tool_library.model;

import au.net.huni.tool_library.model.Category;
import au.net.huni.tool_library.model.ToolOnFileSystem;
import java.util.Set;

privileged aspect ToolOnFileSystem_Roo_JavaBean {
    
    public String ToolOnFileSystem.getName() {
        return this.name;
    }
    
    public void ToolOnFileSystem.setName(String name) {
        this.name = name;
    }
    
    public String ToolOnFileSystem.getDescription() {
        return this.description;
    }
    
    public void ToolOnFileSystem.setDescription(String description) {
        this.description = description;
    }
    
    public String ToolOnFileSystem.getUrl() {
        return this.url;
    }
    
    public void ToolOnFileSystem.setUrl(String url) {
        this.url = url;
    }
    
    public Boolean ToolOnFileSystem.getIsDefault() {
        return this.isDefault;
    }
    
    public void ToolOnFileSystem.setIsDefault(Boolean isDefault) {
        this.isDefault = isDefault;
    }
    
    public Set<Category> ToolOnFileSystem.getCategories() {
        return this.categories;
    }
    
    public void ToolOnFileSystem.setCategories(Set<Category> categories) {
        this.categories = categories;
    }
    
    public String ToolOnFileSystem.getFileName() {
        return this.fileName;
    }
    
    public void ToolOnFileSystem.setFileName(String fileName) {
        this.fileName = fileName;
    }
    
    public long ToolOnFileSystem.getSize() {
        return this.size;
    }
    
    public void ToolOnFileSystem.setSize(long size) {
        this.size = size;
    }
    
}