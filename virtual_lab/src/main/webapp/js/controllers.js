'use strict';

/* Controllers */

function DataProviderListCtrl($scope, DataProvider) {
	$scope.dataProviders = DataProvider.list();
	$scope.orderProp = 'age';
}

//DataProviderListCtrl.$inject = ['$scope', 'DataProvider'];

function DataProviderDetailCtrl($scope, $routeParams, DataProvider) {
	$scope.dataProvider = DataProvider.provider(
			{dataProviderId: $routeParams.providerId});
}

//DataProviderDetailCtrl.$inject = ['$scope', '$routeParams', 'DataProvider'];

//------------------------------------

function LandingCtrl($scope, $routeParams, Landing) {
}

//LandingCtrl.$inject = ['$scope', '$routeParams', 'Landing'];

//------------------------------------

function GlobalDataCtrl($scope, $routeParams, GlobalData) {
}

//GlobalDataCtrl.$inject = ['$scope', '$routeParams', 'GlobalData'];

//------------------------------------

function AdvancedSearchCtrl($scope, $routeParams, AdvancedSearch) {
}

//AdvancedSearchCtrl.$inject = ['$scope', '$routeParams', 'AdvancedSearch'];

//------------------------------------

function WorkspaceCtrl($scope, $routeParams, Workspace) {
	//CommonContainer.init();
}

//WorkspaceCtrl.$inject = ['$scope', '$routeParams', 'Workspace'];

//------------------------------------

function DatasetDirectoryCtrl($scope, $routeParams, DatasetDirectory) {
}

//DatasetDirectoryCtrl.$inject = ['$scope', '$routeParams', 'DatasetDirectory'];

//------------------------------------

function ProjectDirectoryCtrl($scope, $routeParams, Researcher, CredentialService) {

	this.scope = $scope;

	var userName = CredentialService.getUserName();
	this.scope.projects = Researcher.projects({'userName': userName});

	this.scope.projectDirectory = function() {
		return this.projects;
	};
}

//ProjectDirectoryCtrl.$inject = ['$scope', '$routeParams', 'ProjectDirectory', 'CredentialService'];

//------------------------------------

function ToolKitCtrl($scope, $routeParams, Researcher, CredentialService) {

	this.scope = $scope;
	var self = this;
	
	var userName = CredentialService.getUserName();
	
	// Arrange a list of tools by categories and call it a tool kit.
	Researcher.tools({'userName': userName}, function(tools) {		
		var toolKit = [];
		var count = tools.length;
		if (count > 0) {
			var isSane = tools[0] != '<';
			tools.sort(function (item0, item1) {
				var aCategory = '[unknown]';
				if (item0.categories && item0.categories[0]) {
					aCategory = item0.categories[0];
				}
				var bCategory = '[unknown]';
				if (item1.categories && item1.categories[0]) {
					bCategory = item1.categories[0];
				}
				return ((aCategory < bCategory) ? -1
						: ((aCategory > bCategory) ? 1 : 0));
			});
			if (tools[0].categories && tools[0].categories[0]) {
				var currentCategoryName = tools[0].categories[0];
				var currentCategory = {
					"name" : currentCategoryName,
					"tools" : []
				};
				toolKit.push(currentCategory);
				// Extract the list of unique categories
				for ( var index = 0; index < count; index++) {
					var item = tools[index];
					var categoryName = item.categories[0];
					if (categoryName != currentCategoryName) {
						currentCategoryName = categoryName;
						currentCategory = {
							"name" : currentCategoryName,
							"tools" : []
						};
						toolKit.push(currentCategory);
					}
					currentCategory.tools.push({
						"name" : item.name,
						"description" : item.description,
						"url" : item.url
					});
				}
			}
		}
		self.scope.toolKit = toolKit;
	});

	this.scope.selectTool = function(event) {
		var target = event.target;
		var url = target.href;
		var gadgetURL = url.replace('index-3column.html#/', '');
		// Prevent navigation due to link click.
		event.stopPropagation();
		event.preventDefault();

		var siteId = 'gadgetSite';
		var gadgetElement = document.getElementById(siteId);
		var renderParms = {};
		renderParms[osapi.container.RenderParam.WIDTH] = '100%';
	    renderParms['view'] = 'canvas';
		var gadgetSite = CommonContainer.newGadgetSite(gadgetElement);
		CommonContainer.navigateGadget(gadgetSite, gadgetURL, {}, renderParms);
	};
}

//ToolKitCtrl.$inject = ['$scope', '$routeParams', 'Researcher', 'CredentialService'];

//------------------------------------

function HistoryCtrl($scope, $routeParams, History) {

	$scope.actions = [];
	
	$scope.fetchHistory = function() {
		History.query({}, 
			function(validResponse, status, headers, config) {
				if (validResponse[0][0] =='<') {
					// Bad response.
					$scope.failedHistoryFetch = "The returned resource is XML not JSON.";
				} else {
					$scope.actions = validResponse;
				}
			}, 
			function(inValidResponse, status, headers, config) {
				if (status == '404') {
					$scope.failedHistoryFetch = "The requested resource is not available.";
				}
				if (inValidResponse) {
					$scope.failedHistoryFetch = "Remote server failure";
				}
			});
	}
}

//ProjectDirectoryCtrl.$inject = ['$scope', '$routeParams', 'ProjectDirectory'];

//------------------------------------

function ToolLibraryCtrl($scope, $routeParams, ToolLibrary) {
	$scope.toolLibrary = ToolLibrary.list();
	$scope.orderProp = 'age';
}

//ToolLibraryCtrl.$inject = ['$scope', '$routeParams', 'ToolLibrary'];

//------------------------------------

function ToolManagerCtrl($scope, $routeParams, ToolManager) {
}

//ToolManagerCtrl.$inject = ['$scope', '$routeParams', 'ToolManager'];

//------------------------------------

function UserManagerCtrl($scope, $routeParams, UserManager) {
}

//UserManagerCtrl.$inject = ['$scope', '$routeParams', 'UserManager'];
//------------------------------------

function ProfileEditorCtrl($scope, $routeParams, ProfileEditor) {
}

//ProfileEditorCtrl.$inject = ['$scope', '$routeParams', 'ProfileEditor'];

//------------------------------------

function RegistrationCtrl($scope, $routeParams, Registration) {
}

//RegistrationCtrl.$inject = ['$scope', '$routeParams', 'Registration'];

//------------------------------------

function ContactCtrl($scope, $routeParams, Contact) {
}

//ContactCtrl.$inject = ['$scope', '$routeParams', 'Contact'];

//------------------------------------

function LoginCtrl($scope, $routeParams, Login) {
}

//LoginCtrl.$inject = ['$scope', '$routeParams', 'Login'];

//------------------------------------

function MemberPartnersCtrl($scope, $routeParams, MemberPartners) {
}

//MemberPartnersCtrl.$inject = ['$scope', '$routeParams', 'MemberPartners'];

//------------------------------------

function AboutCtrl($scope, $routeParams, About) {
}

//AboutCtrl.$inject = ['$scope', '$routeParams', 'About'];

//------------------------------------

function HuNIAggregateCtrl($scope, $routeParams) {
}

//HuNIAggregateCtrl.$inject = ['$scope', '$routeParams'];

//------------------------------------

function HumanitiesDataSourcesCtrl($scope, $routeParams) {
}

//HuNIAggregateCtrl.$inject = ['$scope', '$routeParams'];

//------------------------------------

function SettingsCtrl($scope, $routeParams, Settings) {
}

//SettingsCtrl.$inject = ['$scope', '$routeParams', 'Settings'];

//------------------------------------

function HelpCtrl($scope, $routeParams, Help) {
}

//HelpCtrl.$inject = ['$scope', '$routeParams', 'Help'];

//==================================================

// Search controllers

var peopleSparqlTemplate = 	 
	'PREFIX cidoc: <http://erlangen-crm.org/current/>'
	+ ' PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>'
	+ ' PREFIX foaf: <http://xmlns.com/foaf/0.1/>'
	+ ' PREFIX skos: <http://www.w3.org/2004/02/skos/core#>'
	+ ' SELECT ?person ?firstName ?lastName ?birthDate ?typeName'
	+ ' WHERE'
	+ ' {'
	+     '?person a cidoc:E21_Person .'
	+     '?person foaf:firstName ?firstName .'
	+     '?person foaf:lastName ?lastName .'
	+     'FILTER(?lastName = "{{surName}}") .'
	+     'OPTIONAL {?person cidoc:P98i_was_born / cidoc:P4_has_time-span / rdf:value ?birthDate}'
	+     'OPTIONAL {?person cidoc:P2_has_type / skos:prefLabel ?typeName}'
	+ ' }'
	;


	var personSparqlTemplate =
		'PREFIX cidoc: <http://erlangen-crm.org/current/>'
		+ ' PREFIX foaf: <http://xmlns.com/foaf/0.1/>'
		+ ' PREFIX skos: <http://www.w3.org/2004/02/skos/core#>'
		+ ' PREFIX oa: <http://www.openannotation.org/ns/>'
		+ ' SELECT ?s ?p ?o ?g ?resource'
		+ ' WHERE'
		+ ' {'
		+ '		BIND (<{{personId}}> AS ?resource) .'
		+ '		{'
		+ '			GRAPH ?g'
		+ '			{ '
		+ '				{'
		+ '					?s ?p ?o.'
		+ '					FILTER( ?s = <{{personId}}> || ?o = <{{personId}}> )'
		+ '				}'
		+ '				UNION { ?s ?p ?o. <{{personId}}> cidoc:P98i_was_born ?s }'
		+ '				UNION { ?s ?p ?o. <{{personId}}> cidoc:P100i_died_in ?s }'
		+ '				UNION { ?s ?p ?o. <{{personId}}> cidoc:P98i_was_born / cidoc:P4_has_time-span ?s }'
		+ '				UNION { ?s ?p ?o. <{{personId}}> cidoc:P100i_died_in / cidoc:P4_has_time-span ?s }'
		+ '				UNION { ?s ?p ?o. <{{personId}}> cidoc:cidoc:P95i_was_formed_by ?s }'
		+ '				UNION { ?s ?p ?o. <{{personId}}> cidoc:P99i_was_dissolved_by ?s }'
		+ '				UNION { ?s ?p ?o. <{{personId}}> cidoc:cidoc:P95i_was_formed_by / cidoc:P4_has_time-span ?s }'
		+ '				UNION { ?s ?p ?o. <{{personId}}> cidoc:P99i_was_dissolved_by / cidoc:P4_has_time-span ?s }'
		+ '			}'
		+ '		}'
		+ '		UNION'
		+ '		{'
		+ ' 		<{{personId}}> cidoc:P2_has_type ?s graph ?g'
		+ ' 		{ ?s ?p ?o }'
		+ ' 	}'
		+ ' }'
		+ ' LIMIT 10000'
		;

	
	var placeSparqlTemplate = 	 
	'PREFIX cidoc: <http://erlangen-crm.org/current/>'
	+ ' PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>'
	+ ' PREFIX foaf: <http://xmlns.com/foaf/0.1/>'
	+ ' PREFIX skos: <http://www.w3.org/2004/02/skos/core#>'
	+ ' SELECT ?place ?placeName ?establishmentDate ?typeName'
	+ ' WHERE'
	+ ' {'
	+     '?place a cidoc:E53_Place .'
	+     '?place cidoc:E44_Place_Appellation ?placeName .'
	+     'FILTER(?placeName = "{{placeName}}") .'
	+     'OPTIONAL {?place cidoc:P4hasTimeSpan / cidoc:P4_has_time-span / rdf:value ?establishmentDate}'
	+     'OPTIONAL {?place cidoc:P2_has_type / skos:prefLabel ?typeName}'
	+ ' }'
	;

var objectSparqlTemplate = 	 
	'PREFIX cidoc: <http://erlangen-crm.org/current/>'
	+ ' PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>'
	+ ' PREFIX foaf: <http://xmlns.com/foaf/0.1/>'
	+ ' PREFIX skos: <http://www.w3.org/2004/02/skos/core#>'
	+ ' SELECT ?object ?objectName ?creationDate ?location ?typeName'
	+ ' WHERE'
	+ ' {'
	+     '?object a cidoc:E24PhysicalManMadeThing .'
	+     '?object cidoc:E41Appellation ?objectName .'
	+     'FILTER(?objectName = "{{objectName}}") .'
	+     'OPTIONAL {?object cidoc:P4hasTimeSpan / cidoc:P4_has_time-span / rdf:value ?creationDate}'
	+     'OPTIONAL {?object cidoc:P53hasCurrentOrFormerLocation / rdf:value ?location}'
	+     'OPTIONAL {?object cidoc:P2_has_type / skos:prefLabel ?typeName}'
	+ ' }'
	;

var eventSparqlTemplate = 	 
	'PREFIX cidoc: <http://erlangen-crm.org/current/>'
	+ ' PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>'
	+ ' PREFIX foaf: <http://xmlns.com/foaf/0.1/>'
	+ ' PREFIX skos: <http://www.w3.org/2004/02/skos/core#>'
	+ ' SELECT ?event ?eventName ?eventDate ?eventLocation ?typeName'
	+ ' WHERE'
	+ ' {'
	+     '?event a cidoc:E5Event .'
	+     '?event cidoc:E41Appellation ?eventName .'
	+     'FILTER(?eventName = "{{eventName}}") .'
	+     'OPTIONAL {?event cidoc:P4hasTimeSpan / cidoc:P4_has_time-span / rdf:value ?eventDate}'
	+     'OPTIONAL {?event cidoc:P53hasCurrentOrFormerLocation / rdf:value ?location}'
	+     'OPTIONAL {?event cidoc:P2_has_type / skos:prefLabel ?typeName}'
	+ ' }'
	;

var pagingSparqlTemplate =	
	' OFFSET {{queryOffset}} LIMIT {{queryLimit}}';

var queryLimit = 10;
var pageIndex = 0;

//------------------------------------

function PersonSearchCtrl($scope, $routeParams, SparqlSearch) {

	  $scope.noOfPages = 5;
	  $scope.currentPage = pageIndex + 1;
	  $scope.maxSize = 5;

	$scope.peopleByFamilyName = function() {
		var surName = $scope.familyName;
		
		// Populate the export button URL
		var sparqlTemplate = peopleSparqlTemplate;
		var sparqlStr = sparqlTemplate.replace(/{{surName}}/, surName);
		$scope.exportUrl = serviceURL + '?query=' + encodeURIComponent(sparqlStr) + '&output=csv';
		
		// Perform the request to populate the HTML results table.
		sparqlTemplate = peopleSparqlTemplate + pagingSparqlTemplate;
		var queryOffset = queryLimit * pageIndex;
		sparqlStr = sparqlTemplate.replace(/{{surName}}/, surName)
			.replace(/{{queryOffset}}/, queryOffset + "")
			.replace(/{{queryLimit}}/, queryLimit + "");
		$scope.response = SparqlSearch.query({'query' : sparqlStr, 'output' : 'json'});
	};
	
	$scope.turnPage = function (pageNo) {
		pageIndex = pageNo - 1;
		$scope.peopleByFamilyName();
	};	  
}

//PersonSearchCtrl.$inject = ['$scope', '$routeParams', 'SparqlSearch'];

//------------------------------------

function PersonRecordCtrl($scope, $routeParams, SparqlSearch) {

	var sparqlStr = personSparqlTemplate.replace(/{{personId}}/g, $routeParams.personId);
	$scope.response = SparqlSearch.query({'query' : sparqlStr, 'output' : 'json'}, function(response) {	
			var person = {};
			person.occupations = [];
			person.firstNames = [];
			person.primaryTopics = [];
			var tripleCount = response.results.bindings.length;
			for (var tripleIndex0 = 0; tripleIndex0 < tripleCount; tripleIndex0++) {
				var currentTriple0 = response.results.bindings[tripleIndex0];
				// Locate a person identifier
				if (currentTriple0.o.value == 'http://erlangen-crm.org/current/E21_Person') {
					var personSubject = currentTriple0.s.value;
					var originalRecordId = currentTriple0.g.value;
					person.originalRecordId = originalRecordId;
					for (var tripleIndex1 = 0; tripleIndex1 < tripleCount; tripleIndex1++) {
						var currentTriple1 = response.results.bindings[tripleIndex1];
						if (currentTriple1.s.value == personSubject) {
							// Navigate to the first name associated with the identifier
							if (currentTriple1.p.value == 'http://xmlns.com/foaf/0.1/firstName') {
								var firstName = currentTriple1.o.value;
								person.firstNames.push(firstName);
							}
							// Navigate to the last name associated with the identifier
							if (currentTriple1.p.value == 'http://xmlns.com/foaf/0.1/lastName') {
								person.lastName = currentTriple1.o.value;
							}
							// Navigate to the birth date associated with the person identifier							
							if (currentTriple1.p.value == 'http://erlangen-crm.org/current/P98i_was_born') {
								var birthObject = currentTriple1.o.value;
								for (var tripleIndex2 = 0; tripleIndex2 < tripleCount; tripleIndex2++) {
									var currentTriple2 = response.results.bindings[tripleIndex2];
									if (currentTriple2.s.value == birthObject) {
										if (currentTriple2.p.value == 'http://erlangen-crm.org/current/P4_has_time-span') {
											var timeSpanObject = currentTriple2.o.value;
											for (var tripleIndex3 = 0; tripleIndex3 < tripleCount; tripleIndex3++) {
												var currentTriple3 = response.results.bindings[tripleIndex3];
												if (currentTriple3.s.value == timeSpanObject) {
													if (currentTriple3.p.value == 'http://www.w3.org/1999/02/22-rdf-syntax-ns#value') {
														person.birthDate = currentTriple3.o.value;
													}
												}
											}
										}
									}
								}
							}
							if (currentTriple1.p.value == 'http://erlangen-crm.org/current/P100i_died_in') {
								var deathObject = currentTriple1.o.value;
								for (var tripleIndex5 = 0; tripleIndex5 < tripleCount; tripleIndex5++) {
									var currentTriple5 = response.results.bindings[tripleIndex5];
									if (currentTriple5.s.value == deathObject) {
										if (currentTriple5.p.value == 'http://erlangen-crm.org/current/P4_has_time-span') {
											var timeSpanObject = currentTriple5.o.value;
											for (var tripleIndex6 = 0; tripleIndex6 < tripleCount; tripleIndex6++) {
												var currentTriple6 = response.results.bindings[tripleIndex6];
												if (currentTriple6.s.value == timeSpanObject) {
													if (currentTriple6.p.value == 'http://www.w3.org/1999/02/22-rdf-syntax-ns#value') {
														person.deathDate = currentTriple6.o.value;
													}
												}
											}
										}
									}
								}
							}
							// Navigate to the multiple occupations associated with the person identifier
							if (currentTriple1.p.value == 'http://erlangen-crm.org/current/P2_has_type') {
								var occupationObject = currentTriple1.o.value;
								for (var tripleIndex4 = 0; tripleIndex4 < tripleCount; tripleIndex4++) {
									var currentTriple4 = response.results.bindings[tripleIndex4];
									if (currentTriple4.s.value == occupationObject) {
										if (currentTriple4.p.value == 'http://www.w3.org/2004/02/skos/core#prefLabel') {
											var occupation = currentTriple4.o.value;
											person.occupations.push(occupation);
										}
									}
								}
							}
							// Navigate to the books etc. associated with the person identifier
							if (currentTriple1.p.value == 'http://xmlns.com/foaf/0.1/isPrimaryTopicOf') {
								var primaryTopic = currentTriple1.o.value;
								person.primaryTopics.push(primaryTopic);
							}
						}
					}
				}
			}
			response.length = 0;
			response.person = person;
		});	
}

//PersonSearchCtrl.$inject = ['$scope', '$routeParams', 'SparqlSearch'];

//------------------------------------

function PlaceSearchCtrl($scope, $routeParams, SparqlSearch) {

	  $scope.noOfPages = 5;
	  $scope.currentPage = pageIndex + 1;
	  $scope.maxSize = 5;

	$scope.placesByPlaceName = function() {
		var placeName = $scope.placeName;
		
		// Populate the export button URL
		var sparqlTemplate = placeSparqlTemplate;
		var sparqlStr = sparqlTemplate.replace(/{{placeName}}/, placeName);
		$scope.exportUrl = serviceURL + '?query=' + encodeURIComponent(sparqlStr) + '&output=csv';
		
		// Perform the request to populate the HTML results table.
		sparqlTemplate = placeSparqlTemplate + pagingSparqlTemplate;
		var queryOffset = queryLimit * pageIndex;
		sparqlStr = sparqlTemplate.replace(/{{placeName}}/, placeName)
			.replace(/{{queryOffset}}/, queryOffset + "")
			.replace(/{{queryLimit}}/, queryLimit + "");
		$scope.response = SparqlSearch.query({'query' : sparqlStr, 'output' : 'json'});
	};
	
	$scope.turnPage = function (pageNo) {
		pageIndex = pageNo - 1;
		$scope.placesByPlaceName();
	};	  
}

//PlaceSearchCtrl.$inject = ['$scope', '$routeParams', 'SparqlSearch'];

//------------------------------------

function ObjectSearchCtrl($scope, $routeParams, SparqlSearch) {

	  $scope.noOfPages = 5;
	  $scope.currentPage = pageIndex + 1;
	  $scope.maxSize = 5;

	$scope.objectsByObjectName = function() {
		var objectName = $scope.objectName;
		
		// Populate the export button URL
		var sparqlTemplate = objectSparqlTemplate;
		var sparqlStr = sparqlTemplate.replace(/{{objectName}}/, objectName);
		$scope.exportUrl = serviceURL + '?query=' + encodeURIComponent(sparqlStr) + '&output=csv';
		
		// Perform the request to populate the HTML results table.
		sparqlTemplate = objectSparqlTemplate + pagingSparqlTemplate;
		var queryOffset = queryLimit * pageIndex;
		sparqlStr = sparqlTemplate.replace(/{{objectName}}/, objectName)
			.replace(/{{queryOffset}}/, queryOffset + "")
			.replace(/{{queryLimit}}/, queryLimit + "");
		$scope.response = SparqlSearch.query({'query' : sparqlStr, 'output' : 'json'});
	};
	
	$scope.turnPage = function (pageNo) {
		pageIndex = pageNo - 1;
		$scope.objectsByObjectName();
	};	  
}

//ObjectSearchCtrl.$inject = ['$scope', '$routeParams', 'SparqlSearch'];
//------------------------------------

function EventSearchCtrl($scope, $routeParams, SparqlSearch) {

	  $scope.noOfPages = 5;
	  $scope.currentPage = pageIndex + 1;
	  $scope.maxSize = 5;

	$scope.eventsByEventName = function() {
		var eventName = $scope.eventName;
		
		// Populate the export button URL
		var sparqlTemplate = eventSparqlTemplate;
		var sparqlStr = sparqlTemplate.replace(/{{eventName}}/, eventName);
		$scope.exportUrl = serviceURL + '?query=' + encodeURIComponent(sparqlStr) + '&output=csv';
		
		// Perform the request to populate the HTML results table.
		sparqlTemplate = eventSparqlTemplate + pagingSparqlTemplate;
		var queryOffset = queryLimit * pageIndex;
		sparqlStr = sparqlTemplate.replace(/{{eventName}}/, eventName)
			.replace(/{{queryOffset}}/, queryOffset + "")
			.replace(/{{queryLimit}}/, queryLimit + "");
		$scope.response = SparqlSearch.query({'query' : sparqlStr, 'output' : 'json'});
	};
	
	$scope.turnPage = function (pageNo) {
		pageIndex = pageNo - 1;
		$scope.eventsByEventName();
	};	  
}

//EventSearchCtrl.$inject = ['$scope', '$routeParams', 'SparqlSearch'];

//------------------------------------

function GroupRecordCtrl($scope, $routeParams, Group) {
}

//GroupRecordCtrl.$inject = ['$scope', '$routeParams', 'Group'];

//==================================================

// Modal dialog box controllers

function FeedbackButtonCtrl($scope, $dialog, $location, FeedbackStatus) {

	$scope.openDialog = function() {
		var dlg = $dialog.dialog({
					backdrop : true,
					keyboard : true,
					backdropClick : true,
					templateUrl :  'partials/feedback-modal.html',
					controller : 'FeedbackModalCtrl'
				});
		dlg.open().then(function(result) {
			if (result) {
				//alert('Thank you for your feedback rating: ' + result.rating + ' and comment: ' + result.comment);
			}
		});
	};

	$scope.feedbackAccepted = function() {
		return FeedbackStatus.getFeedbackAccepted($location.path());
	};
}

FeedbackButtonCtrl.$inject = [ '$scope', '$dialog', '$location', 'FeedbackStatus' ];
//------------------------------------

function FeedbackModalCtrl($scope, dialog, $location, FeedbackStatus, FeedbackService) {
	
	$scope.rating = 0;
	$scope.comment = '';
	
	$scope.feedback = function(result) {
		if (result) {
			var contextPath = $location.path();
			FeedbackStatus.setFeedbackAccepted(contextPath, true);
			var feedbackRating = $scope.rating;
			var feedbackComment = $scope.comment;
			result = {context: contextPath, rating: feedbackRating, comment: feedbackComment};
			var feedbackItem = new FeedbackService(result);
			feedbackItem.$save();
		}
		dialog.close(result);
	};

	$scope.context = function() {
		return $location.path();
	};
}

FeedbackModalCtrl.$inject = [ '$scope', 'dialog', '$location', 'FeedbackStatus', 'FeedbackService' ];
//------------------------------------

function RegistrationButtonCtrl($scope, $dialog) {

	$scope.openDialog = function() {
		var dlg = $dialog.dialog({
					backdrop : true,
					keyboard : true,
					backdropClick : true,
					templateUrl :  'partials/registration-modal.html',
					controller : 'RegistrationModalCtrl'
				});
		dlg.open().then(function(result) {
			if (result) {
				//alert('Thank you for your registration: ' + result.userName + ' and Family Name: ' + result.familyName);
			}
		});
	};
}

RegistrationButtonCtrl.$inject = [ '$scope', '$dialog'];
//------------------------------------

function RegistrationModalCtrl($scope, dialog, RegistrationService, InstitutionService) {

	$scope.master= {};
 
	$scope.update = function(applicant) {
		$scope.master= angular.copy(applicant);
	};
 
	$scope.reset = function() {
		$scope.applicant = angular.copy($scope.master);
	};
 
	$scope.isUnchanged = function(applicant) {
		return angular.equals(applicant, $scope.master);
	};
 
	$scope.reset();
	  
	$scope.apply = function(result) {
		if (result) {
			// Submit button.
			var userName = $scope.applicant.userName;
			var givenName = $scope.applicant.givenName;
			var familyName = $scope.applicant.familyName;
			var emailAddress = $scope.applicant.emailAddress;
			var institutionId = $scope.applicant.institutionId;
			result = {'userName': userName, 'givenName': givenName, 'familyName': familyName, 'emailAddress': emailAddress, 'institutionId': institutionId};
			var registrationItem = new RegistrationService(result);
			registrationItem.$save( 
				function(validResponse, status, headers, config) {
					if (validResponse.status == 'failure') {
						$scope.failedRegistration = validResponse.reason;
					} else {
						dialog.close(result);
					}
				}, 
				function(inValidResponse, status, headers, config) {
					if (status == '404') {
						$scope.failedRegistration = "The requested resource is not available.";
					}
					else if (inValidResponse) {
						$scope.failedRegistration = "Remote server failure";
					}
				});
		} else {
			// Cancel button.
			dialog.close(result);
		}
			
	};	
	$scope.institutions = InstitutionService.query();	
}

RegistrationModalCtrl.$inject = [ '$scope', 'dialog', 'RegistrationService', 'InstitutionService' ];
//------------------------------------

function ProjectButtonCtrl($scope, $dialog) {

	$scope.openDialog = function() {
		var dlg = $dialog.dialog({
					backdrop : true,
					keyboard : true,
					backdropClick : true,
					templateUrl :  'partials/project-modal.html',
					controller : 'ProjectModalCtrl'
				});
		dlg.open().then(function(result) {
			if (result) {
				//alert('Thank you for your project: ' + result.name + ' and start date: ' + result.startDate);
			}
		});
	};
}

ProjectButtonCtrl.$inject = [ '$scope', '$dialog'];
//------------------------------------

function ProjectModalCtrl($scope, $timeout, dialog, Researcher, CredentialService) {

	//---------
	// Form validation
	
	$scope.master= {};
 
	$scope.update = function(proposedProject) {
		$scope.master= angular.copy(proposedProject);
	};
 
	$scope.reset = function() {
		$scope.proposedProject = angular.copy($scope.master);
	};
 
	$scope.isUnchanged = function(proposedProject) {
		return angular.equals(proposedProject, $scope.master);
	};
 
	$scope.reset();
	
	//---------
	// Calendar
	
	 $scope.today = function() {
		    $scope.proposedProject.startDate = new Date();
		  };
	$scope.today();

	$scope.showWeeks = true;
	$scope.toggleWeeks = function () {
			$scope.showWeeks = ! $scope.showWeeks;
		};

	$scope.clear = function () {
		$scope.proposedProject.startDate = null;
	};

	// Disable weekend selection
	$scope.disabled = function(date, mode) {
		return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
	};

	$scope.toggleMin = function() {
		$scope.minDate = ( $scope.minDate ) ? null : new Date();
	};
	$scope.toggleMin();

	$scope.open = function() {
		$timeout(function() {
			$scope.opened = true;
		});
	};

	$scope.dateOptions = {
			'year-format': "'yy'",
			'starting-day': 1
	};	
	
	//---------
	// Submit handler
	
	$scope.apply = function(result) {
		if (result) {
			// Submit button.
			var projectName = $scope.proposedProject.name;
			var startDate = $scope.proposedProject.startDate;
			var userName = CredentialService.getUserName();
			result = {'projectName': projectName, 'startDate': startDate, 'userName': userName};
			var researcherItem = new Researcher(result);
			researcherItem.$addProject( 
				function(validResponse, status, headers, config) {
					if (validResponse.status == 'failure') {
						$scope.failedProject = validResponse.reason;
					} else {
						dialog.close(result);
					}
				}, 
				function(inValidResponse, status, headers, config) {
					if (status == '404') {
						$scope.failedProject = "The requested resource is not available.";
					}
					else if (inValidResponse) {
						$scope.failedProject = "Remote server failure";
					}
				});
		} else {
			// Cancel button.
			dialog.close(result);
		}
			
	};	
}

ProjectModalCtrl.$inject = [ '$scope', '$timeout', 'dialog', 'Researcher', 'CredentialService'];
//------------------------------------

function LoginButtonCtrl($scope, $dialog) {

	$scope.openDialog = function() {
		var dlg = $dialog.dialog({
					backdrop : true,
					keyboard : true,
					backdropClick : true,
					templateUrl :  'partials/login-modal.html',
					controller : 'LoginModalCtrl'
				});
		dlg.open().then(function(result) {
			if (result) {
				 $scope.welcomeUser = result;
				//alert('Thank you for your login: ' + result.userName);
			}
		});
	};
}

LoginButtonCtrl.$inject = [ '$scope', '$dialog'];
//------------------------------------

function LoginModalCtrl($scope, dialog, CredentialService, ProfileService, UserService) {

	$scope.master= {};
	 
	$scope.update = function(user) {
		$scope.master= angular.copy(user);
	};
 
	$scope.reset = function() {
		$scope.user = angular.copy($scope.master);
	};
 
	$scope.isUnchanged = function(user) {
		return angular.equals(user, $scope.master);
	};
 
	$scope.reset();

	$scope.login = function(result) {
		// Submit button.
		if (result) {
			var userName = $scope.user.userName;
			var password = $scope.user.password;
			UserService.validateUser({userName: userName, password: password},
				function(validResponse, status, headers, config) {
					if (validResponse.userName == userName) {
						// we have a valid profile so apply the username and password 
						// and update the profile.
						CredentialService.setUserName(userName);
						CredentialService.setPassword(password);
						ProfileService.setProfile(validResponse);				
						dialog.close(result);
					} else if (validResponse.status = 'failure') {
						$scope.failedLogin = validResponse.reason;
					}
				}, 
				function(inValidResponse, status, headers, config) {
					if (status == '404') {
						$scope.failedLogin = "The requested resource is not available.";
					}
					if (inValidResponse) {
						$scope.failedLogin = "Remote server failure";
					}
				});
		} else {
			// Cancel button.
			dialog.close(result);
		}
	};
}

LoginModalCtrl.$inject = [ '$scope', 'dialog', 'CredentialService', 'ProfileService', 'UserService'];
//------------------------------------

function CarouselCtrl($scope, DataProvider) {
	
	$scope.cycleIndex = 0;
	
	$scope.carousel = [];
	$scope.carousel0 = "";
	$scope.carousel1 = "";
	$scope.carousel2 = "";
	$scope.carousel3 = "";
	$scope.carousel4 = "";
	$scope.carousel5 = "";
	
	var carouselCount = 6;
	
	$scope.dataProviders = DataProvider.list(
		function(validResponse, status, headers, config) {
		});
	
	$scope.dataProviders = DataProvider.list();
	
	
	window.setInterval(function() {
			var carousel = [];
			for (var carouselIndex = 0; carouselIndex < carouselCount; carouselIndex++) {
				var dataProviderIndex = (carouselIndex + $scope.cycleIndex) % carouselCount;
				carousel.push($scope.dataProviders[dataProviderIndex].imageUrl);
			}
			$scope.cycleIndex++;
			$scope.carousel = carousel;
			$scope.$apply();
		}, 5000);
}

CarouselCtrl.$inject = [ '$scope', 'DataProvider'];

//==================================================

