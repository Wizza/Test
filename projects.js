var Projects = function($ele){
	var scope = this;
	var $rootEle = $ele || $('body');

	// Store any required data
	this.data = { projects: null, projectCats: null };

	// Loop through data and Add to DOM
	this.display = function(){
		$(this.data.projectCats).each(function(i, cat){

			// Only show Categories that have projects
			if(cat.projects.length > 0){
				var $cat = $('<div class="cat"><h2>' + cat.TITLE + '</h2></div>')

				$(cat.projects).each(function(j, project){
					var $project = $('<div class="project"><h4>' + project.JOBTITLE + '</h4></div>');
					var $details = $('<div class="details"></div>');

					$details.append('<p><span>Job Number:</span> ' + project.JOBNUMBER + '</p>');
					$details.append('<p><span>Company:</span> ' + project.COMPANYNAME + ' - ' + project.COMPANYCODE + '</p>');
					$details.append('<p><span>Contact Name:</span> ' + project.CONTACTNAME + '</p>');
					$details.append('<p><span>Job Priority:</span> ' + project.JOBPRIORITY + '</p>');
					$details.append('<p><span>Start Date:</span> ' + project.STARTDATE + '</p>');
					$details.append('<p><span>Due Date:</span> ' + project.DUEDATE + '</p>');

					$project.append($details);
					$cat.append($project);
				});

				// Add all generated html to DOM
				$rootEle.append($cat);
			}
		});
	}

	// Group Projects underneath Project Categories
	this.groupByCat = function(){
		$(scope.data.projectCats).each(function(i, cat){
			// Any project data will be stored here, this will modify the reference from data.projectCats
			cat.projects = [];

			$(scope.data.projects).each(function(j, project){

				// Does the current Project ID equal the current Category, if so add to project array inside Category Object
				if(cat.ID === project.PROJECTCATID){
					cat.projects.push(project);
				}
			});
		});
	}

	// Register Any Events
	this.registerEvents = function(){

		// Add click even to Title of Project
		$('.project h4').on('click', function(){
			var $parent = $(this).parent();

			// Quick little toggle to hide and show Project Details
			$parent.hasClass('active') ? $parent.removeClass('active') : $parent.addClass('active')
		});

	}

}