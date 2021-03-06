(function() {
    angular
        .module("propertyTemplateFactory", [])
        .factory("PropertyTemplate", ["Property", "ValueConstraint", PropertyTemplateFactory]);

    function PropertyTemplateFactory(Property, ValueConstraint) {

        function PropertyTemplate(obj, resource) {
            var i;

            this._repeatable = false;
            this._mandatory = false;
            this._type = "literal";
            this._property = null;
            this._constraint = null;
            this._fromResource = resource;
            
            if (typeof obj.repeatable !== "undefined") {
                this._repeatable = (obj.repeatable.toLowerCase() === "true");
            }

            if (typeof obj.mandatory !== "undefined") {
                this._mandatory = (obj.mandatory.toLowerCase() === "true");
            }
            
            if (typeof obj.type !== "undefined") {
                this._type = obj.type;
            }
            
            if (typeof obj.property !== "undefined") {
                this._property = new Property(obj.property);
            }
            
            if (typeof obj.valueConstraint !== "undefined") {
                this._constraint = new ValueConstraint(obj.valueConstraint);
            }
        };
        
        PropertyTemplate.LITERAL = "literal";
        PropertyTemplate.RESOURCE = "resource";
        
        PropertyTemplate.prototype.isOptional = function() {
            return !this._mandatory;
        };
        
        PropertyTemplate.prototype.isRequired = function() {
            return this._mandatory;
        };
        
        PropertyTemplate.prototype.isRepeatable = function() {
            return this._repeatable;
        };
        
        PropertyTemplate.prototype.isLiteral = function() {
            return this._type === PropertyTemplate.LITERAL;
        };
        
        PropertyTemplate.prototype.isResource = function() {
            return this._type === PropertyTemplate.RESOURCE;
        };
        
        PropertyTemplate.prototype.getType = function() {
            return this._type;
        };
        
        PropertyTemplate.prototype.getProperty = function() {
            return this._property;
        };
        
        PropertyTemplate.prototype.getResourceTemplateID = function() {
            return this._fromResource;
        };

        PropertyTemplate.prototype.generateFormID = function() {
            return this._fromResource + "-" + this._property.getID();
        };

        PropertyTemplate.prototype.hasConstraint = function() {
            return this._constraint !== null;
        };
        
        PropertyTemplate.prototype.getConstraint = function() {
            return this._constraint;
        };

        return PropertyTemplate;
    }
})();
 
