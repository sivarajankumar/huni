// WARNING: DO NOT EDIT THIS FILE. THIS FILE IS MANAGED BY SPRING ROO.
// You may push code into the target .java compilation unit if you wish to edit any member(s).

package au.net.huni.model;


privileged aspect Researcher_Roo_ToString {
    
    public String Researcher.toString() {
    	StringBuilder buffer = new StringBuilder();
    	buffer.append(this.getFamilyName());
    	buffer.append(", ");
    	buffer.append(getGivenName());
    	buffer.append(" (");
    	buffer.append(getUserName());
    	buffer.append(")");
        return  buffer.toString() ;
    }
    
}
