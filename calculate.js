// Handle the change event for the number of users
$( "#numUsers" ).on(
    "change",
    function( event ) {
      calculate( "numUsers" );
    });
  
  $( "#numUsersRange" ).on(
    "change",
    function( event ) {
      calculate( "numUsersRange" );
    });
  
  // Handle the change event for the repo structure
  $( "#repoStructureMono" ).on(
    "change",
    function( event ) {
      calculate( "repoStructureMono" );
    });
  
  $( "#repoStructureDist" ).on(
    "change",
    function( event ) {
      calculate( "repoStructureDist" );
    });
  
  // Handle the change event for the usage pattern
  $( "#userUsagePatternCommitters" ).on(
    "change",
    function( event ) {
      calculate( "userUsagePatternCommitters" );
    });
  
  $( "#userUsagePatternProjects" ).on(
    "change",
    function( event ) {
      calculate( "userUsagePatternProjects" );
    });
  
  // Handle the change event for Actions usage
  $( "#actionsUsageNone" ).on(
    "change",
    function( event ) {
      calculate( "actionsUsageNone" );
    });
  
  $( "#actionsUsageLow" ).on(
    "change",
    function( event ) {
      calculate( "actionsUsageLow" );
    });
  
  $( "#actionsUsageModerate" ).on(
    "change",
    function( event ) {
      calculate( "actionsUsageModerate" );
    });
  
  $( "#actionsUsageHigh" ).on(
    "change",
    function( event ) {
      calculate( "actionsUsageHigh" );
    });
  
  // handle the change event for polling
  $( "#PollingYes" ).on(
  "change",
  function( event ) {
    calculate( "PollingYes" );
  });
  
  $( "#PollingNo" ).on(
    "change",
    function( event ) {
      calculate( "PollingNo" );
    });
  
  function calculate( val ) {
    var userCount = parseInt( $("#numUsers").val() );
  
    var vcpu = 16;
    var mem = 0;
  
    // Calculate the resources needed based on users
    if (userCount <= 5000) {
      vcpu = 16;
    } else if (5000 < userCount && userCount <= 10000) {
      vcpu = 24;
    } else {
      multiplier = userCount / 10000;
      vcpu = vcpu * multiplier;
    }
  
    // calculate mem needs based on user counts
    mem = vcpu * 6.5;
  
    // Add cpu if using monorepos
    if ($("#repoStructureMono").is(':checked')) {
      vcpu = vcpu * 1.25;
    }
  
    // Add more resources if using Actions
    if ($("#actionsUsageLow").is(':checked')) {
      vcpu = vcpu + 16;
      mem = mem + 128;
    }
    if ($("#actionsUsageModerate").is(':checked')) {
      vcpu = vcpu + 64;
      mem = mem + 256;
    }
      if ($("#actionsUsageHigh").is(':checked')) {
      vcpu = vcpu + 96;
      mem = mem + 384;
    }
  
    // Add cpu if using polling
    if ($("#PollingYes").is(':checked')) {
      vcpu = vcpu * 1.1;
    }
  
    // Write the recommendations to the screen
    $( "#cpuCount" ).val( vcpu );
    $( "#memCount" ).val( mem );
  }