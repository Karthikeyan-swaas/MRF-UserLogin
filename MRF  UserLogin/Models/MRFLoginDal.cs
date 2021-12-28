using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace MRF__UserLogin.Models
{
    public class MRFLoginDal
    {

        string cs = ConfigurationManager.ConnectionStrings["SQLMVC"].ToString();


        public int Add(MrfLoginModel mrf)
        {
            int i;
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand com = new SqlCommand("sp_insertdetails", con);
                com.CommandType = CommandType.StoredProcedure;

                com.Parameters.AddWithValue("PositionName", mrf.PositionName);
                com.Parameters.AddWithValue("CreatedDate", mrf.MRFCreatedDate);
                com.Parameters.AddWithValue("CreatedById", mrf.MRFCreatedBy);
                com.Parameters.AddWithValue("Userid", mrf.Userid);
                com.Parameters.AddWithValue("Filledbefore", mrf.Positiontobefilledbefore);
                com.Parameters.AddWithValue("VacancyFor", mrf.VacancyFor);
                com.Parameters.AddWithValue("VacancyType", mrf.VacancyType);
                com.Parameters.AddWithValue("Teritory_HQ", mrf.Territory_HQ);
                com.Parameters.AddWithValue("DivisionName", mrf.DivisionName);
                com.Parameters.AddWithValue("MinExperience", mrf.Minyrs);
                com.Parameters.AddWithValue("MaxExperience", mrf.Maxyrs);
                com.Parameters.AddWithValue("MaxCtc", mrf.Maxctc);
                com.Parameters.AddWithValue("minCtc", mrf.Minctc);
                com.Parameters.AddWithValue("AdditionRequirement", mrf.AdditionalRequirement);
                i = com.ExecuteNonQuery();
            }
            return i;
        }


        public List<MrfLoginModel> ListAll()
        {
            List<MrfLoginModel> objmrf = new List<MrfLoginModel>();
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand com = new SqlCommand("Sp_SelectMrfDetails", con);
                com.CommandType = CommandType.StoredProcedure;
                SqlDataReader mrf = com.ExecuteReader();
                while (mrf.Read())
                {
                    objmrf.Add(new MrfLoginModel
                    {

                        id = Convert.ToInt32(mrf["id"]),
                        PositionName = Convert.ToString(mrf["PositionName"]),
                        CreatedBy = Convert.ToString(mrf["UserName"]),
                        MRFCreatedDate = Convert.ToDateTime(mrf["CreatedDate"]),
                        Positiontobefilledbefore = Convert.ToDateTime(mrf["Filledbefore"]),
                        Vacancy = Convert.ToString(mrf["VacancyName"]),
                        MrfVacancyType = Convert.ToString(mrf["VacancyTypeName"]),
                        Territory_HQ = Convert.ToString(mrf["Teritory_HQ"]),
                        DivisionName = Convert.ToString(mrf["DivisionName"]),
                        Minyrs = Convert.ToInt32(mrf["MinExperience"]),
                        Maxyrs = Convert.ToInt32(mrf["MaxExperience"]),
                        Maxctc = Convert.ToInt32(mrf["MaxCtc"]),
                        Minctc = Convert.ToInt32(mrf["MinCtc"]),
                        AdditionalRequirement = Convert.ToString(mrf["AdditionRequirement"]),
                        status = Convert.ToString(mrf["ReqStatus"]),
                        Reqstatus = Convert.ToInt32(mrf["Reqstatus"]),
                        Userid = Convert.ToString(mrf["Userid"])


                    });

                }
                return objmrf;
            }
        }

        public int UpdateRequest(int ID, int Reqstatus)
        {
            int i;
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand com = new SqlCommand("UpdateRequest", con);
                com.CommandType = CommandType.StoredProcedure;
                com.Parameters.AddWithValue("@id", ID);
                com.Parameters.AddWithValue("Status", Reqstatus);
                i = com.ExecuteNonQuery();
            }
            return i;
        }

        public int CheckingloginDetails(string Email, string password)
        {
            try
            {
                int i;
                using (SqlConnection con = new SqlConnection(cs))
                {
                    con.Open();
                    SqlCommand com = new SqlCommand("Sp_ValidateLogindetails", con);
                    com.CommandType = CommandType.StoredProcedure;
                    com.Parameters.AddWithValue("Userid", Email);
                    com.Parameters.AddWithValue("Password", password);
                    i = (Int32)com.ExecuteScalar();
                }
                return i;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
    
