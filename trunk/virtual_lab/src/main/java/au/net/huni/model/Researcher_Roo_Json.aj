// WARNING: DO NOT EDIT THIS FILE. THIS FILE IS MANAGED BY SPRING ROO.
// You may push code into the target .java compilation unit if you wish to edit any member(s).

package au.net.huni.model;

import au.net.huni.model.Researcher;
import flexjson.JSONDeserializer;
import flexjson.JSONSerializer;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

privileged aspect Researcher_Roo_Json {
    
    public String Researcher.toJson() {
        return new JSONSerializer().exclude("*.class").serialize(this);
    }
    
    public static Researcher Researcher.fromJsonToResearcher(String json) {
        return new JSONDeserializer<Researcher>().use(null, Researcher.class).deserialize(json);
    }
    
    public static String Researcher.toJsonArray(Collection<Researcher> collection) {
        return new JSONSerializer().exclude("*.class").serialize(collection);
    }
    
    public static Collection<Researcher> Researcher.fromJsonArrayToResearchers(String json) {
        return new JSONDeserializer<List<Researcher>>().use(null, ArrayList.class).use("values", Researcher.class).deserialize(json);
    }
    
}