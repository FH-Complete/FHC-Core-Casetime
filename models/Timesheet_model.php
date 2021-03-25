<?php
class Timesheet_model extends DB_Model
{

	/**
	 * Constructor
	 */
	public function __construct()
	{
		parent::__construct();
		$this->dbTable = 'addon.tbl_casetime_timesheet';
		$this->pk = 'timesheet_id';
	}


	public function getPendingTimesheets()
	{
		$qry = "SELECT 
					DISTINCT uid 
				FROM addon.tbl_casetime_timesheet 
				WHERE abgeschicktamum IS NOT NULL
				AND genehmigtamum IS NULL
				ORDER BY uid";
		return $this->execQuery($qry);
	}

	public function getUidofMissingTimesheetsLastMonth()
	{
		$qry = "SELECT 
					DISTINCT uid
				FROM addon.tbl_casetime_timesheet 
				WHERE date_trunc('month',datum) = (date_trunc('month', current_date-interval '1' month))
				AND abgeschicktamum IS NULL
				ORDER BY uid";
		return $this->execQuery($qry);
	}

	public function getAllMissingZeitmodelle()
	{
		//$url = site_url("../addons/casetime/vilesci/allZeitmodelle.php/");
		$url = "https://c3p0.hacker.technikum-wien.at/fhcomplete/addons/casetime/vilesci/allZeitmodelle.php";
		$opts = array(
			'http'=>array(
				'method'=>"GET",
			)
		);

		$context = stream_context_create($opts);

// Öffnen der Datei mit den oben definierten HTTP-Headern
		$file = file_get_contents($url, false, $context);
		return json_decode($file);
	}

}