// WARNING: DO NOT EDIT THIS FILE. THIS FILE IS MANAGED BY SPRING ROO.
// You may push code into the target .java compilation unit if you wish to edit any member(s).

package au.net.huni.model;

import au.net.huni.model.HistoryItem;
import flexjson.JSONDeserializer;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

privileged aspect HistoryItem_Roo_Json {
    
    public static HistoryItem HistoryItem.fromJsonToHistoryItem(String json) {
        return new JSONDeserializer<HistoryItem>().use(null, HistoryItem.class).deserialize(json);
    }
    
    public static Collection<HistoryItem> HistoryItem.fromJsonArrayToHistoryItems(String json) {
        return new JSONDeserializer<List<HistoryItem>>().use(null, ArrayList.class).use("values", HistoryItem.class).deserialize(json);
    }
    
}